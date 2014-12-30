#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ---------------------------------------------------------------------------
# Author: Matthieu Holtz
# Year:   2015
# ---------------------------------------------------------------------------

import serial
import time

port = serial.Serial("/dev/ttyAMA0",baudrate=9600, timeout=None)

def readlineCR():
    rv = ""
    while True:
        ch = port.read()
        rv += ch
        if ch=='\r' or ch=='' or ch=='\n':
            return rv

def onReceive(data):
	print (data)

while True:
    #rcv = port.readline()
    rcv = readlineCR()
    onReceive(rcv)