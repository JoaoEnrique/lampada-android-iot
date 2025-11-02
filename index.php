<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Caminho do arquivo JSON que armazena o estado de todos os dispositivos
$estadoFile = 'estado.json';

// Cria o arquivo JSON se não existir
if (!file_exists($estadoFile)) {
    file_put_contents($estadoFile, json_encode([]));
}

// Lê o estado atual
$estados = json_decode(file_get_contents($estadoFile), true);

// Pega o ID do dispositivo e o novo estado via GET
$deviceId = $_GET['device'] ?? null;
$novoEstado = $_GET['novoEstado'] ?? null;

// Verifica se o ID foi enviado
if (!$deviceId) {
    echo json_encode(["error" => "Dispositivo não especificado"]);
    exit;
}

// Atualiza o estado se receber comando válido
if ($novoEstado === 'ligar' || $novoEstado === 'desligar') {
    $estados[$deviceId] = $novoEstado;
    file_put_contents($estadoFile, json_encode($estados));
    echo json_encode(["estado" => $novoEstado]);
} else {
    // Retorna o estado atual do dispositivo
    $estadoAtual = $estados[$deviceId] ?? 'desligado';
    echo json_encode(["estado" => $estadoAtual]);
}
?>
