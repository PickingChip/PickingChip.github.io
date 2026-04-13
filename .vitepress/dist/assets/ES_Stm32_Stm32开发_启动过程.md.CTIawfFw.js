import{_ as a,o as n,c as p,ag as e}from"./chunks/framework.BuUvxvtQ.js";const l="/assets/%E5%AD%98%E5%82%A8%E7%A9%BA%E9%97%B4%E6%98%A0%E5%B0%84%E8%A1%A8.dyYPLhiV.jpg",i="/assets/%E4%B8%89%E7%A7%8D%E5%90%AF%E5%8A%A8%E6%A8%A1%E5%BC%8F.Bbg_YKBt.png",c="/assets/%E5%8F%96%E5%87%BA%E4%B8%BB%E6%A0%88%E6%8C%87%E9%92%88.D3BReWzV.png",D=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"ES/Stm32/Stm32开发/启动过程.md","filePath":"ES/Stm32/Stm32开发/启动过程.md","lastUpdated":1775898880000}'),t={name:"ES/Stm32/Stm32开发/启动过程.md"};function d(o,s,_,r,R,h){return n(),p("div",null,[...s[0]||(s[0]=[e('<h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><p>Stm32单片机的启动过程就是指单片机在上电后到开始执行用户程序这之间所进行的所有操作，简单来说就是唤醒整个单片机系统硬件配置为软件执行做准备的过程。</p><h3 id="启动模式" tabindex="-1">启动模式 <a class="header-anchor" href="#启动模式" aria-label="Permalink to &quot;启动模式&quot;">​</a></h3><p>我们知道32位单片机理论上最大的逻辑寻址空间是2的32次幂也就是<code>4GB</code>，具体每一部分空间对应的实际存储器如下图所示：</p><p><img src="'+l+'" alt="存储空间映射表"></p><p>而单片机在上电之后会默认去执行<code>0x00000000</code>地址开始执行程序，但是实际上它执行的指令并不存放在<code>0x0000000</code>而是存放在其它地址的指令。这个过程涉及到地址&quot;重映射&quot;，地址的映射是指为实际存储器分配逻辑地址的过程，而重映射指的是已经有了逻辑地址的存储空间被再次分配逻辑地址，通过这两个逻辑地址都可以访问该存储空间（类似函数的映射的概念）。Boot引脚的不同组合方式决定哪个部分的实际存储器的逻辑地址被重新映射到<code>0x00000000</code>，从而决定了单片机的实际启动位置。</p><p>启动时，单片机在 SYSCLK 的第四个上升沿锁存 BOOT 引脚的值。（注意这个时候单片机的时钟系统还未初始化，使用的是默认的时钟配置，时钟源为HSI）BOOT0 为专用引脚，而 BOOT1 则与 GPIO 引脚共用。一旦完成对 BOOT1 的采样，相应 GPIO 引脚即进入空闲状态，可用于其它用途。BOOT0与BOOT1引脚的不同值指向了三种启动方式：</p><p><img src="'+i+'" alt="三种启动模式"></p><ul><li><p>从主Flash启动：</p><p>主Flash指的是STM32的内置Flash。选择该启动模式后，内置Flash的起始地址<code>0x08000000</code>将被重映射到<code>0x00000000</code>地址，代码将在该处开始执行。一般我们使用JTAG或者SWD模式下载调试程序时，就是下载到这里面，重启后也直接从这启动。</p></li><li><p>从系统存储器启动：</p><p>系统储存器指的是STM32的内置ROM，选择该启动模式后，内置ROM的起始地址将被重映射到<code>0x00000000</code>地址，代码在此处开始运行。ROM中有一段出厂预置的代码，这段代码起到一个桥的作用，允许外部通过UART/CAN或USB等将代码写入STM32的内置Flash中。这段代码也被称为ISP(In System Programing)代码，这种烧录代码的方式也被称为ISP烧录。</p></li><li><p>内置的SRAM中启动： 显然，该方法是在STM32的内置SRAM中启动，选择该启动模式后，内置SRAM的起始地址将被重映射到0x00000000地址，代码在此处开始运行。这种模式由于烧录程序过程中不需要擦写Flash，因此速度较快，适合调试，但是掉电丢失。</p></li></ul><p>经过重映射后单片机访问<code>0x00000000</code>地址得到的就是将栈顶位置存放到MSP（主栈指针寄存器）的命令，接着执行存放在<code>0x00000004</code>的指令就会跳转到是复位函数的位置去执行复位函数。</p><p><img src="'+c+`" alt="image-20241222021459136"></p><p>上图就是从主Flash启动的过程时，单片机在上电时执行前两条指令的过程，这个过程中单片机访问的是<code>0x0000000</code>由于重映射它实际访问的地址却是Flash的起始地址<code>0x08000000</code>。这里的栈顶位置一般为SRAM的最高地址（栈向下生长），而复位函数则定义在启动文件当中。</p><p>PS.arm架构的处理器使用精简指令集所有指令都是32位。</p><h3 id="启动文件" tabindex="-1">启动文件 <a class="header-anchor" href="#启动文件" aria-label="Permalink to &quot;启动文件&quot;">​</a></h3><p>我们通常使用C语言编写在单片机上运行的程序，我们知道C语言编写的程序的运行需要依赖于栈和堆，但是在单片机上电之初堆栈都还没有初始化，这时用C编写的程序无法运行，因此C语言无法完成初始化单片机的任务，这就是为是什么启动文件使用汇编语言编写。</p><p>不同的编译器使用不同的启动文件（因为不同的编译器的汇编语法不同），但是它们做的事大致相同，分为一下几个部分：</p><ol><li><p>定义栈和堆的大小</p><p>这一部分的代码定义了堆栈的大小，当程序需要较大的堆栈空间时可以在这里修改堆栈大小，但是两者的大小之和应当小于SRAM的的大小，因为堆和栈都是存放在RAM中的，RAM的起始地址为<code>0x200000000</code>。</p><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Stack_Size      EQU     0x00001000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                AREA    STACK, NOINIT, READWRITE, ALIGN=3</span></span>
<span class="line"><span>Stack_Mem       SPACE   Stack_Size</span></span>
<span class="line"><span>__initial_sp</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Heap_Size       EQU     0x00001000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                AREA    HEAP, NOINIT, READWRITE, ALIGN=3</span></span>
<span class="line"><span>__heap_base</span></span>
<span class="line"><span>Heap_Mem        SPACE   Heap_Size</span></span>
<span class="line"><span>__heap_limit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                PRESERVE8</span></span>
<span class="line"><span>                THUMB</span></span></code></pre></div></li><li><p>定义中断向量表</p><p>这部分代码定义了中断向量表，所谓的向量表实际上就是指针表（向量和指针都是带有指向性的数值有些相似的味道），这里每一个中断向量都申请四字节的存储空间（刚好就是32位单片机的字长，而指针所占存储空间的大小就是处理器的字长），它们都是是指向对应中断服务函数的函数指针。当中断发生的时会产生中断信号，单片机会跳转到中断向量表的起始位置，开始根据中断信号查表直到找到对应的中断向量，然后跳转到中断向量指向的中断服务函数当中去完成中断处理。</p><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                AREA    RESET, DATA, READONLY</span></span>
<span class="line"><span>                EXPORT  __Vectors</span></span>
<span class="line"><span>                EXPORT  __Vectors_End</span></span>
<span class="line"><span>                EXPORT  __Vectors_Size</span></span>
<span class="line"><span></span></span>
<span class="line"><span>__Vectors       DCD     __initial_sp               ; Top of Stack</span></span>
<span class="line"><span>                DCD     Reset_Handler              ; Reset Handler</span></span>
<span class="line"><span>                DCD     NMI_Handler                ; NMI Handler</span></span>
<span class="line"><span>                DCD     HardFault_Handler          ; Hard Fault Handler</span></span>
<span class="line"><span>                DCD     MemManage_Handler          ; MPU Fault Handler</span></span>
<span class="line"><span>                DCD     BusFault_Handler           ; Bus Fault Handler</span></span>
<span class="line"><span>                DCD     UsageFault_Handler         ; Usage Fault Handler</span></span>
<span class="line"><span>                DCD     0                          ; Reserved</span></span>
<span class="line"><span>                DCD     0                          ; Reserved</span></span>
<span class="line"><span>                DCD     0                          ; Reserved</span></span>
<span class="line"><span>                DCD     0                          ; Reserved</span></span>
<span class="line"><span>                DCD     SVC_Handler                ; SVCall Handler</span></span>
<span class="line"><span>                DCD     DebugMon_Handler           ; Debug Monitor Handler</span></span>
<span class="line"><span>                DCD     0                          ; Reserved</span></span>
<span class="line"><span>                DCD     PendSV_Handler             ; PendSV Handler</span></span>
<span class="line"><span>                DCD     SysTick_Handler            ; SysTick Handler</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                ; External Interrupts</span></span>
<span class="line"><span>                DCD     WWDG_IRQHandler                   ; Window WatchDog                                        </span></span>
<span class="line"><span>                DCD     PVD_IRQHandler                    ; PVD through EXTI Line detection                        </span></span>
<span class="line"><span>                DCD     TAMP_STAMP_IRQHandler             ; Tamper and TimeStamps through the EXTI line            </span></span>
<span class="line"><span>                DCD     RTC_WKUP_IRQHandler               ; RTC Wakeup through the EXTI line                       </span></span>
<span class="line"><span>                DCD     FLASH_IRQHandler                  ; FLASH                                           </span></span>
<span class="line"><span>                DCD     RCC_IRQHandler                    ; RCC                                             </span></span>
<span class="line"><span>                DCD     EXTI0_IRQHandler                  ; EXTI Line0                                             </span></span>
<span class="line"><span>                DCD     EXTI1_IRQHandler                  ; EXTI Line1  </span></span>
<span class="line"><span>                .......</span></span>
<span class="line"><span>                __Vectors_End</span></span>
<span class="line"><span></span></span>
<span class="line"><span>__Vectors_Size  EQU  __Vectors_End - __Vectors</span></span></code></pre></div></li><li><p>定义代码块</p><p>这一行代码定义了一个只读数据段<code>.text</code>这个数据段用来存放编译后产生的机器码，它的大小在链接时由链接器根据编译的结果确定。</p><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>   AREA    |.text|, CODE, READONLY</span></span></code></pre></div></li><li><p>定义复位函数</p><p>这段代码定义了中断复位函数，中断复位函数从外部导入了两个函数<code>SystemInit</code>和<code>__main</code>。<code>SystemInit</code>函数定义在<code>system_stm32f1xx.h</code>文件当中，<code>__main</code>是C库函数。复位函数首先执行<code>SystemInit</code>进行单片机时钟系统的初始化，将时钟源从默认的HSI该为用户配置的HSE（外部时钟源具有更好的精度这在进行高速通讯时十分重要），然后<code>__main</code>函数被执行，这个函数会设置堆的起始位置和状态。然后进行全局和静态变量的初始化，这个过程会将全局和静态变量搬运到RAM中，并将未初始化的变量在内存中的位置（<code>.bss</code> 段）清零，将已初始化的变量的值复制到相应的内存位置（<code>.data</code> 段）。然后<code>__main</code>会找到用户<code>main</code>函数的入口执行用户函数。</p><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Reset_Handler    PROC</span></span>
<span class="line"><span>                 EXPORT  Reset_Handler             [WEAK]</span></span>
<span class="line"><span>        IMPORT  SystemInit</span></span>
<span class="line"><span>        IMPORT  __main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                 LDR     R0, =SystemInit</span></span>
<span class="line"><span>                 BLX     R0</span></span>
<span class="line"><span>                 LDR     R0, =__main</span></span>
<span class="line"><span>                 BX      R0</span></span>
<span class="line"><span>                 ENDP</span></span></code></pre></div></li><li><p>定义中断服务函数</p><p>这段代码定义了中断服务函数，当然这些都是弱定义（处理方式基本都是死循环），允许用户在外面进行重复定义中断服务函数。</p><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NMI_Handler     PROC</span></span>
<span class="line"><span>                EXPORT  NMI_Handler                [WEAK]</span></span>
<span class="line"><span>                B       .</span></span>
<span class="line"><span>                ENDP</span></span>
<span class="line"><span>HardFault_Handler\\</span></span>
<span class="line"><span>                PROC</span></span>
<span class="line"><span>                EXPORT  HardFault_Handler          [WEAK]</span></span>
<span class="line"><span>                B       .</span></span>
<span class="line"><span>                ENDP</span></span>
<span class="line"><span>                ......</span></span>
<span class="line"><span>SPI6_IRQHandler                   </span></span>
<span class="line"><span>SAI1_IRQHandler                   </span></span>
<span class="line"><span>LTDC_IRQHandler                   </span></span>
<span class="line"><span>LTDC_ER_IRQHandler                 </span></span>
<span class="line"><span>DMA2D_IRQHandler                  </span></span>
<span class="line"><span>                B       .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                ENDP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                ALIGN</span></span></code></pre></div></li><li><p>完善堆栈初始化</p><p>这段代码用于完善堆栈初始化，通过判断是否使用了微库来采取不同的不同的方式，将堆栈的起止位置分别存储到寄存器中</p><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                IF      :DEF:__MICROLIB</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                 EXPORT  __initial_sp</span></span>
<span class="line"><span>                 EXPORT  __heap_base</span></span>
<span class="line"><span>                 EXPORT  __heap_limit</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                 ELSE</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                 IMPORT  __use_two_region_memory</span></span>
<span class="line"><span>                 EXPORT  __user_initial_stackheap</span></span>
<span class="line"><span>                 </span></span>
<span class="line"><span>__user_initial_stackheap</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                 LDR     R0, =  Heap_Mem</span></span>
<span class="line"><span>                 LDR     R1, =(Stack_Mem + Stack_Size)</span></span>
<span class="line"><span>                 LDR     R2, = (Heap_Mem +  Heap_Size)</span></span>
<span class="line"><span>                 LDR     R3, = Stack_Mem</span></span>
<span class="line"><span>                 BX      LR</span></span>
<span class="line"><span>                 </span></span>
<span class="line"><span>                 ALIGN #设置对齐</span></span></code></pre></div></li></ol><p>至此启动过程就完成了，单片机正式进入到用户程序的运行。</p>`,18)])])}const E=a(t,[["render",d]]);export{D as __pageData,E as default};
