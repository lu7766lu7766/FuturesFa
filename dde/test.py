import time
import threading

a = {
    'a': 'b',
    'c': 'd'
}


def setInterval(func, sec):
  def func_wrapper():
    setInterval(func, sec)
    func()
  t = threading.Timer(sec, func_wrapper)
  t.start()
  return t


def updating():
  a['a'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
  a['c'] = time.time()
  print('updating')


def doing():
  print(a)


setInterval(updating, 0.5)
setInterval(doing, 3)
