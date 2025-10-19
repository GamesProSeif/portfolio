---
title: "Data Acquisition Lab 7th Revision"
date: "2025-10-19"
excerpt: "Revision for the 7th Lab Quiz for the Data Acquisition Systems Subject."
---

## Basic Structure

Every Arduino sketch must have two main functions:

```cpp
void setup() {
	// Runs once when the board is powered or reset
}
void loop() {
	// Runs continuously after setup()
}
```

---

## pinMode()

Sets a pin as **input** or **output**.

```cpp
pinMode(pin, mode);`
```

- `pin` → The pin number (e.g., `2`, `13`, `A0`)
- `mode` → `INPUT`, `OUTPUT`, or `INPUT_PULLUP`

**Example:**

```cpp
void setup() {
	pinMode(13, OUTPUT);  // Set digital pin 13 as output
	pinMode(2, INPUT);    // Set digital pin 2 as input
}
```

---

## digitalWrite()

Writes a **HIGH (5V)** or **LOW (0V)** signal to a digital output pin.

```cpp
digitalWrite(pin, value);
```

- `value` → `HIGH` or `LOW`

**Example:**

```cpp
digitalWrite(13, HIGH);  // Turn ON LED on pin 13
digitalWrite(13, LOW);   // Turn OFF LED on pin 13
```

---

## digitalRead()

Reads the logic level from a digital input pin.

```cpp
int state = digitalRead(pin);
```

Returns:
- `HIGH` → 5V
- `LOW` → 0V

**Example:**
```cpp
int buttonState = digitalRead(2);
if (buttonState == HIGH) {
	digitalWrite(13, HIGH);
} else {
	digitalWrite(13, LOW);
}
```

---

## analogRead()

Reads the analog voltage (0–5V) from an analog pin (A0–A5).  
Returns a value **between 0 and 1023**.

```cpp
int value = analogRead(A0);
```

**Example:**

```cpp
int sensorValue = analogRead(A0);
Serial.println(sensorValue);
```

---

## analogWrite()

Outputs a **PWM signal** on certain digital pins (`3, 5, 6, 9, 10, 11`).  
Used for simulating analog output (0–255).

```cpp
analogWrite(pin, value);
```

**Example:**

```cpp
analogWrite(9, 128);  // 50% duty cycle (approx 2.5V average)
```

---

## delay()

Pauses the program for a specified number of milliseconds.

```cpp
delay(time_in_ms);
```

**Example:**

```cpp
digitalWrite(13, HIGH);
delay(1000);            // wait 1 second
digitalWrite(13, LOW);
delay(1000);`
```

---

## Serial Communication

### Serial.begin()

Starts the serial communication with your computer.

```cpp
Serial.begin(baud_rate);
```

**Example:**

```cpp
void setup() {
	Serial.begin(9600);  // Start serial at 9600 baud
}
```

---

### Serial.print() & Serial.println()

Used to send data to the Serial Monitor.

```cpp
Serial.print(data); Serial.println(data);  // Adds a new line
```

**Example:**

```cpp
int sensor = analogRead(A0);
Serial.print("Sensor Value: ");
Serial.println(sensor);
```

---

## map()

Re-maps a number from one range to another.

```cpp
map(value, fromLow, fromHigh, toLow, toHigh);
```

**Example:**

Converts range from 0-1023 to 0-255

```cpp
int sensorValue = analogRead(A0);            // 0–1023
int ledBrightness = map(sensorValue, 0, 1023, 0, 255);
analogWrite(9, ledBrightness);
```

---

## Full Example – Light-Controlled LED

```cpp
void setup() {
	pinMode(A0, INPUT);    // LDR sensor input
	pinMode(9, OUTPUT);    // LED output
	Serial.begin(9600);    // Start serial monitor
}
void loop() {
	int light = analogRead(A0);                      // Read light sensor
	int brightness = map(light, 0, 1023, 0, 255);    // Convert range
	analogWrite(9, brightness);                      // Adjust LED   
	Serial.println(brightness);
	delay(500);
}
```

---

## Moving Average

A **moving average** is a technique used to **smooth out short-term fluctuations** in data by calculating the average of the most recent values within a fixed window.

In Arduino and sensor applications, it’s commonly used to **reduce noise** in analog signals — for example, readings from a temperature sensor or potentiometer that vary slightly each time due to electrical noise.

Instead of reacting to every small change, the moving average gives a **more stable and realistic** value.

---

**Example:**  
If the last 5 readings are: `505, 507, 509, 510, 506`  
then the moving average =  
(505 + 507 + 509 + 510 + 506) / 5 = 507.4

Each new reading replaces the oldest one, and the average "moves" along with the data — hence the name **moving average**.

#### Code Example: 

```cpp
#define SENSOR_PIN A0       // Analog pin for sensor input
#define MAX_READ 10         // Number of readings to average (window size)

int readings[MAX_READ];     // Array to store sensor readings
int readIndex = 0;          // Index of the current reading

void setup() {
  Serial.begin(9600);       // Initialize Serial Monitor
  for (int i = 0; i < MAX_READ; i++) {
    readings[i] = 0;        // Initialize all readings to 0
  }
}

void loop() {
  // 1. Read the current sensor value
  readings[readIndex] = analogRead(SENSOR_PIN);

  // 2. Advance to the next index (circular buffer)
  readIndex = readIndex + 1;
  if (readIndex >= MAX_READ) {
    readIndex = 0;  // Wrap around to index 0
  }
  
  // 3. Calculate
  long total = 0;
  for (int i = 0; i < MAX_READ; i++)
	  total += readings[i];

  // 4. Compute the moving average
  float average = total / (float)MAX_READ;

  // 5. Print data to Serial Monitor
  Serial.print("Sensor value: ");
  Serial.print(readings[readIndex]);
  Serial.print("\tMoving Average: ");
  Serial.println(average);

  delay(200);  // Small delay between readings
}
```