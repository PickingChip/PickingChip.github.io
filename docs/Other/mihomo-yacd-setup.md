# Mihomo + Yacd 完整配置与部署指南

本文档整理从零到可用的完整流程：
- 配置 Mihomo 基础参数
- 配置订阅、策略组与规则
- 解决 GeoIP 数据库下载失败
- 部署 Yacd 控制面板（在线与离线两种方式）
- 验证服务与常见问题排查

适用场景：树莓派或 Linux 服务器，配置文件位于 `/etc/mihomo/config.yaml`。

---

## 1. 目标效果

完成后你可以实现：
1. 代理端口可被局域网设备使用（默认 `7890`）。
2. Mihomo 外部控制 API 在 `9999` 端口监听。
3. 浏览器通过 `http://服务器IP:9999/ui` 打开 Yacd 面板。
4. 节点自动测速并选择可用节点（`Auto` 组）。

---

## 2. 推荐配置文件示例

以下示例对应当前项目中已验证过的结构：

```yaml
mixed-port: 7890
allow-lan: true
bind-address: 0.0.0.0
mode: rule
log-level: info

external-controller: 0.0.0.0:9999
secret: "change-this-to-a-strong-password"
external-ui: /etc/mihomo/ui
external-ui-name: yacd

dns:
  enable: true
  ipv6: true
  enhanced-mode: fake-ip
  fake-ip-filter:
    - "*.lan"
    - "*.local"
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
    - 8.8.8.8

proxy-providers:
  mysub:
    type: http
    url: "https://<your-subscribe-url>"
    path: ./proxy_provider/mysub.yaml
    interval: 3600
    health-check:
      enable: true
      interval: 300
      url: https://www.gstatic.com/generate_204

proxy-groups:
  - name: NodeSelect
    type: select
    proxies:
      - Auto
      - DIRECT
    use:
      - mysub

  - name: Auto
    type: url-test
    use:
      - mysub
    url: https://www.gstatic.com/generate_204
    interval: 300

rules:
  - GEOIP,CN,DIRECT
  - MATCH,Auto
```

---

## 3. 关键配置项说明

### 3.1 监听与代理

- `mixed-port: 7890`
  - 开启混合端口（HTTP + SOCKS）。
  - 客户端一般填 `服务器IP:7890`。

- `allow-lan: true`
  - 允许局域网设备访问代理端口。

- `bind-address: 0.0.0.0`
  - 监听所有网卡地址。

### 3.2 控制 API 与面板

- `external-controller: 0.0.0.0:9999`
  - Mihomo 控制 API 监听地址。
  - 若写成 `127.0.0.1:9090`，则只能本机访问。

- `secret`
  - 控制 API 的认证密码。
  - 必须使用强密码，禁止使用 `123456` 这类弱口令。

- `external-ui: /etc/mihomo/ui`
  - 面板静态文件目录。

- `external-ui-name: yacd`
  - UI 名称标识，通常可保留 `yacd`。

### 3.3 DNS

- `enhanced-mode: fake-ip`
  - 常见稳定方案，适配大多数透明代理与客户端场景。

- `nameserver`
  - 建议同时配置国内可用 DNS，降低解析失败风险。

### 3.4 订阅与策略组

- `proxy-providers.mysub`
  - 订阅来源。`path` 为本地缓存文件。

- `NodeSelect`
  - 手动选择策略组。
  - 增加 `Auto` 和 `DIRECT` 作为兜底可选项。

- `Auto`
  - 自动测速选优策略组（`url-test`）。

### 3.5 规则

- `GEOIP,CN,DIRECT`
  - 需要 GeoIP 数据库（`geoip.metadb`）。
  - 若数据库不存在或下载失败，配置测试会报错。

- `MATCH,Auto`
  - 其余流量默认走自动策略组，避免手选坏节点导致全局不可用。

---

## 4. 下载链接汇总

### 4.1 Yacd 面板

- 官方 GitHub ZIP：
  - https://github.com/haishanh/yacd/archive/refs/heads/gh-pages.zip

- 常用镜像（网络不稳定时可尝试）：
  - https://ghproxy.com/https://github.com/haishanh/yacd/archive/refs/heads/gh-pages.zip

说明：该 ZIP 是 Yacd 前端静态页面（HTML/CSS/JS），不是节点订阅文件。

### 4.2 GeoIP 数据库（Mihomo 使用）

- 官方发布地址（latest）：
  - https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip.metadb

放置路径建议：`/etc/mihomo/geoip.metadb`

---

## 5. 安装与部署步骤

## 5.1 配置文件测试

```bash
mihomo -t -d /etc/mihomo -f /etc/mihomo/config.yaml
```

如果测试通过，再重启服务：

```bash
sudo systemctl restart mihomo
sudo systemctl status mihomo --no-pager -l
```

## 5.2 部署 Yacd（离线推荐）

假设你已把压缩包放在 `/tmp/yacd-gh-pages.zip`：

```bash
sudo mkdir -p /etc/mihomo/ui
sudo rm -rf /tmp/yacd-gh-pages
unzip -q /tmp/yacd-gh-pages.zip -d /tmp
sudo rm -rf /etc/mihomo/ui/*
sudo cp -a /tmp/yacd-gh-pages/. /etc/mihomo/ui/
```

验证文件：

```bash
ls -lah /etc/mihomo/ui | head
ls -lah /etc/mihomo/ui/index.html
```

---

## 6. 访问方式

1. 面板地址：`http://服务器IP:9999/ui`
2. API 地址：`http://服务器IP:9999`
3. Secret：配置文件里的 `secret`

提示：访问 `http://服务器IP:9999` 直接看到 `{"message":"Unauthorized"}` 属于正常现象，表示 API 已经可达但未认证。

---

## 7. 常见问题与排查

### 7.1 报错：can't download MMDB / context deadline exceeded

原因：服务器无法访问 GitHub 导致 GeoIP 下载失败。

处理：手动下载 `geoip.metadb` 到 `/etc/mihomo/`，并确认权限可读。

```bash
ls -lh /etc/mihomo/geoip.metadb
sudo chown root:root /etc/mihomo/geoip.metadb
sudo chmod 644 /etc/mihomo/geoip.metadb
```

### 7.2 报错：dial tcp 0.0.0.0:443 connect refused

原因：订阅里存在不可用节点（地址被错误写成 `0.0.0.0`）或当前选中坏节点。

排查：

```bash
grep -n "server: 0.0.0.0" /etc/mihomo/proxy_provider/mysub.yaml | head
```

如果存在大量异常节点，建议更换订阅源或联系服务商修复。

### 7.3 浏览器打不开面板

1. 确认 `external-ui` 目录存在并有 `index.html`。
2. 确认访问路径是 `/ui`，不是根路径。
3. 检查防火墙是否放行 `9999/tcp`。

### 7.4 能解析域名但 ping 不通 Google

`ping` 使用 ICMP，不走 HTTP/SOCKS 代理。不能用 `ping` 判断代理是否可用。

建议改用：

```bash
curl -I https://www.google.com --proxy http://127.0.0.1:7890 --max-time 15
```

---

## 8. 安全建议

1. `secret` 必须使用高强度随机字符串。
2. 控制端口仅建议在内网使用，不建议直接暴露公网。
3. 如需远程访问，建议结合防火墙只允许可信来源 IP。

---

## 9. 变更记录建议

每次调整配置后，建议执行：

```bash
mihomo -t -d /etc/mihomo -f /etc/mihomo/config.yaml
```

通过后再重启，避免因配置错误导致服务不可用。
