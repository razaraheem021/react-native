export let aclData = [
  {
    "acl-service-name": "BC-A",
    sites: [
      {
        "site-name": "stc-5",
        devices: [
          {
            "device-name": "netsim-xr-8",
            "access-lists": [
              {
                "access-list-name": "FYHA-SR-ALL-IN-BC-A",
                "vrf-name": "Test-vrf-800",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv4-prefix": "156.200.97.0/24",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv4-prefix": "156.200.92.0/24",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv4-prefix": "157.200.92.0/24",
                      },
                    ],
                  },
                ],
              },
              {
                "access-list-name": "FYHA-SR-ALL-IN-BC-A-IPv6",
                "vrf-name": "Test-vrf-803",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv6-prefix": "2407:30c0:20f::/48",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv6-prefix": "2407:30c0:203::/48",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv6-prefix": "2408:30c0:203::/48",
                      },
                    ],
                  },
                ],
              },
              {
                "access-list-name": "FYHA-SR-MSMN-IN-BC-A",
                "vrf-name": "Test-vrf-801",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv4-prefix": "156.200.97.0/24",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv4-prefix": "156.200.92.0/24",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv4-prefix": "157.200.92.0/24",
                      },
                    ],
                  },
                ],
              },
              {
                "access-list-name": "MATCH-BC-A-INBOUND-IPv6",
                "vrf-name": "Test-vrf-804",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv6-prefix": "2407:30c0:20f::/48",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv6-prefix": "2407:30c0:203::/48",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv6-prefix": "2408:30c0:203::/48",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            "device-name": "netsim-xr-9",
            "access-lists": [
              {
                "access-list-name": "FYHA-SR-ALL-IN-BC-A",
                "vrf-name": "Test-vrf-900",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv4-prefix": "156.200.97.0/24",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv4-prefix": "156.200.92.0/24",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv4-prefix": "157.200.92.0/24",
                      },
                    ],
                  },
                ],
              },
              {
                "access-list-name": "FYHA-SR-ALL-IN-BC-A-IPv6",
                "vrf-name": "Test-vrf-903",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv6-prefix": "2407:30c0:20f::/48",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv6-prefix": "2407:30c0:203::/48",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv6-prefix": "2408:30c0:203::/48",
                      },
                    ],
                  },
                ],
              },
              {
                "access-list-name": "FYHA-SR-MSMN-IN-BC-A",
                "vrf-name": "Test-vrf-901",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv4-prefix": "156.200.97.0/24",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv4-prefix": "156.200.92.0/24",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv4-prefix": "157.200.92.0/24",
                      },
                    ],
                  },
                ],
              },
              {
                "access-list-name": "MATCH-BC-A-INBOUND-IPv6",
                "vrf-name": "Test-vrf-904",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv6-prefix": "2407:30c0:20f::/48",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv6-prefix": "2407:30c0:203::/48",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv6-prefix": "2408:30c0:203::/48",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        "site-name": "stc-6",
        devices: [
          {
            "device-name": "netsim-xr-10",
            "access-lists": [
              {
                "access-list-name": "FYHA-SR-ALL-IN-BC-A-IPv6-Site10-R1-ACL4",
                "vrf-name": "Test-vrf-47",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv6-prefix": "2407:30c0:20f::/48",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv6-prefix": "2407:30c0:203::/48",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv6-prefix": "2408:30c0:203::/48",
                      },
                    ],
                  },
                ],
              },
              {
                "access-list-name": "FYHA-SR-ALL-IN-BC-A-Site10-R1-ACL2",
                "vrf-name": "Test-vrf-45",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv4-prefix": "156.200.97.0/24",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv4-prefix": "156.200.92.0/24",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv4-prefix": "157.200.92.0/24",
                      },
                    ],
                  },
                ],
              },
              {
                "access-list-name": "FYHA-SR-MSMN-IN-BC-A-Site10-R1-ACL1",
                "vrf-name": "Test-vrf-46",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv4-prefix": "156.200.97.0/24",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv4-prefix": "156.200.92.0/24",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv4-prefix": "157.200.92.0/24",
                      },
                    ],
                  },
                ],
              },
              {
                "access-list-name": "MATCH-BC-A1-INBOUND-IPv6-Site10-R1-ACL3",
                "vrf-name": "Test-vrf-48",
                customers: [
                  {
                    "customer-name": "Test-1",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000010",
                        "ipv6-prefix": "2407:30c0:20f::/48",
                      },
                      {
                        "sequence-number": "1800000011",
                        "ipv6-prefix": "2407:30c0:203::/48",
                      },
                    ],
                  },
                  {
                    "customer-name": "Test-2",
                    "ip-prefixes": [
                      {
                        "sequence-number": "1800000012",
                        "ipv6-prefix": "2408:30c0:203::/48",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            "device-name": "netsim-xr-11",
          },
        ],
      },
    ],
  },
];
