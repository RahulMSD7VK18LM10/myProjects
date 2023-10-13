#include "DHT.h" 
#define DHTPIN 2 
#define DHTTYPE DHT11 
DHT dht(DHTPIN, DHTTYPE);
#include <GSM.h>
#define PINNUMBER ""
GSM gsmAccess; 
GSM_SMS sms; 
#include <Wire.h> 
#include <LiquidCrystal.h> 
const int rs=53,e=52,d4=48,d5=49,d6=50,d7=51;
LiquidCrystal lcd(rs,e,d4,d5,d6,d7);
#define USE_ARDUINO_INTERRUPTS true 
#include <PulseSensorPlayground.h>

const int PulseWire = 0;
const int LED13 = 13;
int Threshold = 550;

PulseSensorPlayground pulseSensor;

#define button1 7
bool button_state=0;
float t,f;
int myBPM,k=0;

char remoteNumber[15]= "+919424527610";
 char txtMsg1[30]="The temperature measured is:";
 char txtMsg2[30]="The heart beat measured is:";
 char u1[3]="*C";
 char u2[17]="beats per minute";

void setup() 
{ 
 Serial.begin(9600);
 pinMode(button1, INPUT_PULLUP);
 lcd.begin(16,2);
 lcd.setCursor(0,0);
 lcd.print("Initializing...");
 delay(1000);
 lcd.clear();
 dht.begin();
 pulseSensor.analogInput(PulseWire);
 pulseSensor.blinkOnPulse(LED13); 
 pulseSensor.setThreshold(Threshold);

 if (pulseSensor.begin()) 
   {
    lcd.setCursor(0,0);
    lcd.print("Patient Health");
    lcd.setCursor(0,1);
    lcd.print("Monitoring systm");
    delay(1000);
   }
 lcd.clear(); 
 lcd.setCursor(0,0); 
 lcd.print("To measure the"); 
 delay(100);
 lcd.setCursor(0,1); 
 lcd.print("temperatuer");
 delay(300);
 lcd.clear(); 
 lcd.setCursor(0,0); 
 lcd.print("put finger on te");
 delay(100); 
 lcd.setCursor(0,1); 
 lcd.print("mperature sensor");
 delay(700); 
 lcd.clear();
 lcd.setCursor(0,0); 
 lcd.print("To measure the");
 delay(100); 
 lcd.setCursor(0,1); 
 lcd.print("heart rate");
 delay(300);
 lcd.clear(); 
 lcd.setCursor(0,0); 
 lcd.print("put finger on");
 delay(100); 
 lcd.setCursor(0,1); 
 lcd.print("heartbeat sensor");  
}
void loop() 
{ 
 delay(500);
 t = dht.readTemperature(); 
 f = dht.readTemperature(true);
 myBPM = pulseSensor.getBeatsPerMinute();
 lcd.clear(); 
 lcd.setCursor(0,0); 
 lcd.print("T: "); 
 lcd.print(t); 
 lcd.print(" *C ");
 delay(800);
 if (pulseSensor.sawStartOfBeat())
 {
  lcd.setCursor(0,1);
  lcd.print("Heart rate: "); 
  lcd.print(myBPM);
 }
 delay(1000);
 lcd.clear();
 lcd.setCursor(0,0);
 lcd.print("if you want to");
 lcd.setCursor(0,1);
 lcd.print("send message");
 delay(500);
 lcd.clear();
 lcd.setCursor(0,0);
 lcd.print("press the button");
 delay(500);
 lcd.setCursor(0,1);
 lcd.print("now");
 delay(1000);
 button_state= digitalRead(button1);
 delay(500);
   if(button_state == LOW)
      {
         lcd.clear();
         lcd.setCursor(0,0);
         lcd.print("button pressed!!!");
         delay(500);
         sendSMS();
         loop();
      }
   else
     {
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print("Reading again!!!");
      loop();
     }
}
 
 void sendSMS()
 {
 lcd.clear();
 lcd.setCursor(0,0);
 lcd.print("Msg to number: ");
 lcd.setCursor(0,1);
 lcd.print(remoteNumber);
 delay(1000);
 lcd.clear();
 lcd.setCursor(0,0);
 lcd.print("SENDING...");
 delay(700);
if(sms.beginSMS(remoteNumber))
 {
  k=k+1;
  sms.print(txtMsg1);
  sms.print(t);
  sms.print(u1);
  sms.print(txtMsg2);
  sms.print(myBPM);
  sms.print(u2);
 }
 if(k==1)
  {
    Serial.println("Text Sent!!!");
    k=k+1;
  }
 delay(1000);
 recSMS();
 sms.endSMS();
}
void recSMS()
{
  if(k==2)
   {
    Serial.println("The received text is...");
    delay(500);
    Serial.println(txtMsg1);
    Serial.println(t);
    Serial.println(u1);
    delay(100);
    Serial.println(txtMsg2);
    Serial.println(myBPM);
    Serial.println(u2);
    delay(1000);
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Message Sent!!!");
    delay(1000);
    loop();
   }
}
