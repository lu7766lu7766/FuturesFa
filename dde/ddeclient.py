# -*- coding: utf-8 -*-
import PyWinDDE
import datetime
import sys
import time


#f1 = open("data/stock_02.csv","a")
#f2= open("data/stock_03.csv","a")

def recNextTickData(value, item):
  aValue = value.split(";")
  # print(float(aValue[2].split(".")[0]))
  # print(float(aValue[3].split(".")[0]))
  name = aValue[0]
  price = aValue[1]
  outsize = aValue[2].split(".")[0]
  insize = aValue[3].split(".")[0]
  volume = float(outsize) - float(insize)
  out_string = "name:%s; price:%s; volume:%s; time:%s" % (
      name, price, volume, datetime.datetime.now())
  print(out_string)
  #f2.write(out_string + "\n")


while True:
  try:
    dde = PyWinDDE.DDEClient("XQLITE", "Quote")
    break
  except:
    e = sys.exc_info()[0]
    errpr_string = "Error: %s, try to connect 60 mins later." % e
    print(errpr_string)
    time.sleep(3600)
    print("Connect to DDE server again...")

print("Connected to DDE server, start listening...")
# 股票/期貨代號,名稱,時間,買進,賣出,成交,單量,總量,高點,低點,開盤
#dde.advise("FIMTX02.TF-ID,Name,Time,Bid,Ask,Price,Volume,TotalVolume,High,Low,Open",callback = recTickData)
#dde.advise("TXOn06C10350.TF-Name",callback = recNextTickData)
#dde.advise("TXOn06C10350.TF-price",callback = recNextTickData)
#dde.advise("TXOn06C10350.TF-volume",callback = recNextTickData)
#dde.advise("tx2n06C10350.TF-Name",callback = recNextTickData)
#dde.advise("tx2n06C10350.TF-price",callback = recNextTickData)
#dde.advise("tx2n06C10350.TF-volume",callback = recNextTickData)
dde.advise("tx2n06C10500.TF-Name,price,outsize,insize",
           callback=recNextTickData)
PyWinDDE.WinMSGLoop()

# Test cases
# dde.advise("0050.TW-ID,Name,Time,Bid,Ask,Price,PriceChange,PriceChangeRatio,Amplitude,AvgPrice")
#dde.advise("TSE.TW-PreClose",callback = recTickData)
#dde.advise("FITX03.TF-PreClose",callback = recTickData)
#dde = PyWinDDE.DDEClient("HTS","KS")
#dde = PyWinDDE.DDEClient("CATDDE","FUTOPT<FO>TXFB6    ")
# dde.advise("CurPrice,TickVol,Diff,DiffRate,Open,High,Low")
# dde.advise("CurPrice")
