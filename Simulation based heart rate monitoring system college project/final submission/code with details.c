#include "DHT.h"           // include the "DHT.h" Library
#define DHTPIN 2           // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11      // type of DHT sensor used
DHT dht(DHTPIN, DHTTYPE);  // defining pin and dht type in dht function

#include <GSM.h>          // import the gsm library
#define PINNUMBER ""       // initialize the library instance
GSM gsmAccess;            // include a 'true' parameter for debug enabled
GSM_SMS sms;              // to use gsm for sms purpose

#include <Wire.h>        

#include <LiquidCrystal.h> // importing liquid crystal library 
const int rs=53,e=52,d4=48,d5=49,d6=50,d7=51; // declaring come constants.
LiquidCrystal lcd(rs,e,d4,d5,d6,d7);          // declaring pins of lcd using above declared coefficients.

#define USE_ARDUINO_INTERRUPTS true     // Set-up low-level interrupts for most acurate BPM math.
#include <PulseSensorPlayground.h>      // Includes the PulseSensorPlayground Library.

const int PulseWire = 0;     // PulseSensor PURPLE WIRE connected to ANALOG PIN 0
const int LED13 = 13;        // The on-board Arduino LED, close to PIN 13.
int Threshold = 550;         // Determine which Signal to "count as a beat" and which to ignore.
// Use the "Gettting Started Project" to fine-tune Threshold Value beyond default setting.
// Otherwise leave the default "550" value.

PulseSensorPlayground pulseSensor;   // Creates an instance of the PulseSensorPlayground object called "pulseSensor"

#define button1 7          // defining button
bool button_state=0;       // defining the state as low
float t,f;                 // declaring variables t and f as float type
int myBPM,k=0;             // declaring variables myBPM and k as integer type

char remoteNumber[15]= "+919424527610";    // mobile number to which the sms is to be sent. 
 char txtMsg1[30]="The temperature measured is: ";   // The text that will be sent.
 char txtMsg2[30]="The heart beat measured is: ";    // The text that will be sent.
 char u1[3]="*C";    // The text that will be sent.
 char u2[17]="beats per minute";     // The text that will be sent.

void setup() 
{ 
 Serial.begin(9600);    // initialize serial communications
 pinMode(button1, INPUT_PULLUP);  // declaring the pin mode of button as input or output .
 lcd.begin(16,2);      // begining the lcd.
 lcd.setCursor(0,0);
 lcd.print("Initializing...");
 delay(1000);
 lcd.clear();
 dht.begin();
 pulseSensor.analogInput(PulseWire);  // convert input of heart sensor into analog form. 
 pulseSensor.blinkOnPulse(LED13); 
 pulseSensor.setThreshold(Threshold);

 if (pulseSensor.begin()) 
   {
    lcd.setCursor(0,0);
    lcd.print("Patient Health");
    lcd.setCursor(0,1);
    lcd.print("Monitoring");
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
 lcd.print("heart beat");
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
 t = dht.readTemperature(); // read temperatue
 f = dht.readTemperature(true);  // Check if any reads failed and exit early (to try again).
 
 myBPM = pulseSensor.getBeatsPerMinute();  //Calls function on our pulseSensor object that returns BPM as an "int".
 
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
 button_state= digitalRead(button1);   // to take input from user on buttuon state 
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
if(sms.beginSMS(remoteNumber))  // begin sms sending function.
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
	loop(); //calling the loop function again.
   }
}