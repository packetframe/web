<div class="main">
    <pre class="dig">
{`┌──────────────────────────────────────────────────────────[n@box:~#]───┐
│ + - o                                                                 │
│                                                                       │
│                                                                       │
│ ;; ->>HEADER<<- opcode: QUERY; status: NOERROR; id: 28724             │
│ ;; Flags: qr aa rd; QUERY: 1; ANSWER: 2; AUTHORITY: 0; ADDITIONAL: 0  │
│                                                                       │
│ ;; QUESTION SECTION:                                                  │
│ ;; packetframe.com.          IN    NS                                 │
│                                                                       │
│ ;; ANSWER SECTION:                                                    │
│ packetframe.com.    86400    IN    NS    ns1.packetframe.com.         │
│ packetframe.com.    86400    IN    NS    ns2.packetframe.com.         │
│                                                                       │
│ ;; Received 81 B                                                      │
│ ;; Time 2021-12-22 23:16:26 PST                                       │
│ ;; From 2602:809:3004::2@53(UDP) in 0.3 ms                            │
│                                                                       │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘`}
    </pre>
    <div class="pf">
        <pre class="pf">
┌───────────────────────────────────────────────────────────<span class="no-gradient">[Packetframe]</span>───┐
│ + - o                                                                     │
│                                                                           │
│  <span class="no-gradient">┌────────────────────┐ ┌──────┐ ┌──────┐ ┌──────────────────────┐ ┌───┐</span>  │
│  <span class="no-gradient">│ @                  │ │ A  ▼ │ │ 3600 │ │ 192.0.2.191          │ │ x │</span>  │
│  <span class="no-gradient">└────────────────────┘ └──────┘ └──────┘ └──────────────────────┘ └───┘</span>  │
│                                                                           │
│   <span class="no-gradient">Label                  Type     TTL      Value</span>                          │
│  <span class="no-gradient">┌─────────────────────────────────────────────────────────────────────┐</span>  │
│  <span class="no-gradient">│ @                     A        86400    192.0.2.191                 │</span>  │
│  <span class="no-gradient">├─────────────────────────────────────────────────────────────────────┤</span>  │
│  <span class="no-gradient">│ @                     AAAA     86400    2001:db8:191::f             │</span>  │
│  <span class="no-gradient">├─────────────────────────────────────────────────────────────────────┤</span>  │
│  <span class="no-gradient">│ ingress               CNAME    3600     ingress.cluster-a           │</span>  │
│  <span class="no-gradient">├─────────────────────────────────────────────────────────────────────┤</span>  │
│  <span class="no-gradient">│ @                     TXT      86400    v=spf1 mx a -all            │</span>  │
│  <span class="no-gradient">├─────────────────────────────────────────────────────────────────────┤</span>  │
│  <span class="no-gradient">│ dkim._domainkey       TXT      86400    v=DKIM1;k=rsa;t=s;s=...     │</span>  │
│  <span class="no-gradient">└─────────────────────────────────────────────────────────────────────┘</span>  │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
        </pre>
    </div>
</div>

<style>
    .main {
        width: 580px;
        height: 500px;
        position: relative;
    }

    pre {
        margin-top: 25px;
        margin-bottom: 60px;
        color: white;
        line-height: 1.2;
        white-space: pre;
        font-size: 8pt;
        font-family: 'Courier New', monospace;
        overflow: hidden;
        resize: none;
        text-align: left;
    }

    .dig {
        position: absolute;
        top: 0;
        left: 0;
        color: #cccccc;
    }

    div.pf {
        position: absolute;
        top: 180px;
        left: 100px;
        background-color: #040404 !important;
    }

    pre.pf {
        background: #D53BAB;
        background: -webkit-linear-gradient(to right, #D53BAB 0%, #AB2AFF 100%);
        background: -moz-linear-gradient(to right, #D53BAB 0%, #AB2AFF 100%);
        background: linear-gradient(to right, #D53BAB 0%, #AB2AFF 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
    }

    .no-gradient {
        color: white !important;
        background: transparent !important;
        -webkit-background-clip: initial;
        -webkit-text-fill-color: initial;
    }
</style>
