#include <WiFi.h>
#include <WiFiClientSecure.h> // Para HTTPS
#include <ArduinoJson.h>

const char* ssid = "ssid";
const char* password = "password";

const char* host = "server"; // apenas o domínio (sem https://)
const int httpsPort = 443;            // porta HTTPS padrão
const int relePin = 3;                // GPIO usado pelo relé

void setup() {
  Serial.begin(115200);
  pinMode(relePin, OUTPUT);

  Serial.println("Conectando ao Wi-Fi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\nConectado ao Wi-Fi!");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
}


void loop() {
  WiFiClientSecure client;
  client.setInsecure(); // Ignora verificação SSL (útil para testes)

  Serial.println("\nConectando ao servidor...");

  if (!client.connect(host, httpsPort)) {
    Serial.println("Falha na conexão com o servidor.");
    digitalWrite(relePin, HIGH); // Desliga o relé por segurança
    delay(5000);
    return;
  }

  // Envia a requisição GET
  client.print("GET /status.php?device=device1 HTTP/1.1\r\n");
  client.print("Host: ");
  client.println(host);
  client.println("Connection: close");
  client.println();

  // Aguarda resposta do servidor
  while (client.connected() || client.available()) {
    if (client.available()) {
      String line = client.readStringUntil('\n');
      Serial.println(line);

      // Controla o relé com base na resposta
      if (line.indexOf("desligar") >= 0) {
        digitalWrite(relePin, HIGH);
        Serial.println("Relé desligado.");
      } else if (line.indexOf("ligar") >= 0) {
        digitalWrite(relePin, LOW);
        Serial.println("Relé ligado.");
      }
    }
  }

  client.stop();
  delay(500);
}
