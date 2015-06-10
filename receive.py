#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ---------------------------------------------------------------------------
# Author: Matthieu Holtz
# Year:   2015
# ---------------------------------------------------------------------------

import serial
import time
import requests
import threading
import time
import RPi.GPIO as GPIO
from enum import Enum
import signal
import sys


class Color(Enum):
     RED = 0
     GREEN = 1
     YELLOW = 2

port = serial.Serial("/dev/ttyAMA0",baudrate=9600, timeout=None)
LED_GREEN_PIN = 24
LED_RED_PIN = 25

GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_RED_PIN, GPIO.OUT, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(LED_GREEN_PIN, GPIO.OUT, pull_up_down=GPIO.PUD_DOWN)

def ledOff():
    GPIO.output(LED_RED_PIN, GPIO.LOW)
    GPIO.output(LED_GREEN_PIN, GPIO.LOW)

def ledOn(color):
    ledOff()
    if color == Color.RED:
         GPIO.output(LED_RED_PIN, GPIO.HIGH)
    elif color == Color.GREEN:
         GPIO.output(LED_GREEN_PIN, GPIO.HIGH)
    elif color == Color.YELLOW:
         GPIO.output(LED_RED_PIN, GPIO.HIGH)
         GPIO.output(LED_GREEN_PIN, GPIO.HIGH)
    else:
         return None

def ledOnDuring(color, timeSeconds):
    ledOn(color)
    time.sleep(timeSeconds)
    ledOff()

def readlineCR():
    rv = ""
    while True:
        ch = port.read()
        rv += ch
        if ch=='\r' or ch=='' or ch=='\n':
            return rv

def onReceive(payload):
	url = 'http://localhost:3000/api/Sensors/receive'
	headers = {'content-type': 'application/json'}
	r = requests.post(url, data=payload, headers=headers)
	print ("Sending to webservice... " + r.text)
	print (payload)
        if r.status_code == 200:
             ledOn(Color.GREEN)
        else:
             ledOn(Color.YELLOW)

def signal_handler(signal, frame):
        print('Exiting!')
        ledOff()
        port.close()
  	sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

port.open()

ledOn(Color.RED)

while True:
    rcv = readlineCR()
    onReceive(rcv)
