#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ---------------------------------------------------------------------------
# Author: Matthieu Holtz
# Year:   2015
# ---------------------------------------------------------------------------

import serial
import time
import sys
import getopt

def usage():
	print "Usage : configure.py [-h] [--CH=arg] [--ID=arg] [--DL=arg] [--MY=arg] [--NI=arg]"
	print " -h\t\tprint this help message"
	print " --CH=arg\tset the XBee channel property with the specified argument"
	print " --ID=arg\tset the XBee PAN ID property with the specified argument"
	print " --DL=arg\tset the XBee destination address (low) property with the specified argument"
	print " --MY=arg\tset the XBee device address property with the specified argument"
	print " --NI=arg\tset the XBee node identifier property with the specified argument"

port = serial.Serial("/dev/ttyAMA0", baudrate=9600, timeout=2)
port.close();
port.open();

def readlineCR():
    rv = ""
    while True:
        ch = port.read()
        if ch=='\r' or ch=='' or ch=='\n':
            return rv
        rv += ch

def enterXbeeCommandMode():
	port.write('+++')
	return readlineCR()

def xbeeCommand(command="", argument=""):
	port.write('AT'+command+argument+'\r')
	time.sleep(0.5)
	return readlineCR()


def xbeeExitCommandMode():
	return xbeeCommand("CN")


CH = ""
ID = ""
DL = ""
MY = ""
NI = ""

try:
  opts, args = getopt.getopt(sys.argv[1:],"h",["CH=","ID=","DL=","MY=","NI="])
except getopt.GetoptError:
  usage()
  sys.exit(2)
for opt, arg in opts:
  if opt == '-h':
    usage()
    sys.exit()
  elif opt in ("--CH"):
     CH=arg
  elif opt in ("--ID"):
     ID=arg
  elif opt in ("--DL"):
     DL=arg  
  elif opt in ("--MY"):
     MY=arg
  elif opt in ("--NI"):
     NI=arg

time.sleep(2)
cmdMode = enterXbeeCommandMode()
print ("enter +++ ="+cmdMode)
if cmdMode != "OK":
	print ("cannot enter +++ command mode... quitting")
	port.close()
	sys.exit(2)

print ("AT="+xbeeCommand())

if CH !="":
	print ("set CH="+CH+" "+xbeeCommand("CH", CH))
print ("CH="+xbeeCommand("CH"))

if ID !="":
	print ("set ID="+ID+" "+xbeeCommand("ID", ID))
print ("ID="+xbeeCommand("ID"))

if DL !="":
	print ("set DL="+DL+" "+xbeeCommand("DL", DL))
print ("DL="+xbeeCommand("DL"))

if MY !="":
	print ("set MY="+MY+" "+xbeeCommand("MY", MY))
print ("MY="+xbeeCommand("MY"))

if NI !="":
	print ("set NI="+NI+" "+xbeeCommand("NI", NI))
print ("NI="+xbeeCommand("NI"))

print ("Exit="+xbeeExitCommandMode())

port.close()