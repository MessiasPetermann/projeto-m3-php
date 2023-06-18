<?php
// Configuração do banco de dados
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'TarefasJa';

// Criação da conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
  die('Erro na conexão com o banco de dados: ' . $conn->connect_error);
}

$action = $_POST['action'] ?? $_GET['action'] ?? '';

// Adicionar uma nova tarefa
if ($action === 'add') {
  $title = $_POST['title'];
  $description = $_POST['description'];
  $dueDate = $_POST['dueDate'];

  $sql = "INSERT INTO tarefas (titulo, descricao, data_conclusao) VALUES ('$title', '$description', '$dueDate')";

  if ($conn->query($sql) === TRUE) {
    echo 'Tarefa adicionada com sucesso.';
  } else {
    echo 'Erro ao adicionar a tarefa: ' . $conn->error;
  }
}

// Obter todas as tarefas
if ($action === 'getTasks') {
  $sql = "SELECT * FROM tarefas";
  $result = $conn->query($sql);
  $tasks = [];

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $tasks[] = $row;
    }
  }

  echo json_encode($tasks);
}

$conn->close();
?>
