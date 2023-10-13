#!/bin/bash
unset http_proxy
unset https_proxy

/usr/local/bin/python3 /data/Schedular/Device.py &
/usr/local/bin/python3 /data/Schedular/Community.py

