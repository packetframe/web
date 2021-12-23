<script>
    let content = `┌──────────────────────────────────────────────────────────[n@box:~#]───┐
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
│                    ┌──────────────────────────────────────────────────┴────────[Packetframe]───┐
│ ;; Received 81 B   │ + - o                                                                     │
│ ;; Time 2021-12-22 │                                                                           │
│ ;; From 2602:809:30│  ┌────────────────────┐ ┌──────┐ ┌──────┐ ┌──────────────────────┐ ┌───┐  │
│                    │  │ @                  │ │ A  ▼ │ │ 3600 │ │ 192.0.2.191          │ │ ✓ │  │
│                    │  └────────────────────┘ └──────┘ └──────┘ └──────────────────────┘ └───┘  │
└────────────────────┤                                                                           │
                     │   Label                  Type     TTL      Value                          │
                     │  ┌─────────────────────────────────────────────────────────────────────┐  │
                     │  │ @                     A        86400    192.0.2.191                 │  │
                     │  ├─────────────────────────────────────────────────────────────────────┤  │
                     │  │ @                     AAAA     86400    2001:db8:191::f             │  │
                     │  ├─────────────────────────────────────────────────────────────────────┤  │
                     │  │ ingress               CNAME    3600     ingress.cluster-a           │  │
                     │  ├─────────────────────────────────────────────────────────────────────┤  │
                     │  │ @                     TXT      86400    v=spf1 mx a -all            │  │
                     │  ├─────────────────────────────────────────────────────────────────────┤  │
                     │  │ dkim._domainkey       TXT      86400    v=DKIM1;k=rsa;t=s;s=...     │  │
                     │  └─────────────────────────────────────────────────────────────────────┘  │
                     │                                                                           │
                     └───────────────────────────────────────────────────────────────────────────┘`
</script>

<pre>{content}</pre>

<style>
    pre {
        margin-top: 25px;
        margin-bottom: 60px;
        color: white;
        line-height: 1.2;
        white-space: pre;
        font-size: 8pt;
        font-family: monospace, monospace;
        overflow: hidden;
        resize: none;
        text-align: left;
    }
</style>