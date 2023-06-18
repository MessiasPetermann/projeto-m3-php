$(document).ready(function() {
    loadTasks();
  
    // Submit do formulário de adicionar tarefa
    $('#addTaskForm').submit(function(e) {
      e.preventDefault();
      var taskTitle = $('#taskTitle').val();
      var taskDescription = $('#taskDescription').val();
      var taskDueDate = $('#taskDueDate').val();
  
      // Validação dos campos
      if (taskTitle === '' || taskDueDate === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
  
      // Requisição AJAX para adicionar tarefa
      $.ajax({
        url: 'api.php',
        type: 'POST',
        data: {
          action: 'add',
          title: taskTitle,
          description: taskDescription,
          dueDate: taskDueDate
        },
        success: function(response) {
          alert('Tarefa adicionada com sucesso.');
          loadTasks();
          $('#addTaskForm')[0].reset();
        },
        error: function(xhr, status, error) {
          alert('Ocorreu um erro ao adicionar a tarefa. Por favor, tente novamente.');
          console.log(xhr.responseText);
        }
      });
    });
  
    // Função para carregar as tarefas existentes
    function loadTasks() {
      $.ajax({
        url: 'api.php',
        type: 'GET',
        data: { action: 'getTasks' },
        success: function(response) {
          var tasks = JSON.parse(response);
          var taskList = '';
  
          tasks.forEach(function(task) {
            taskList += '<tr>';
            taskList += '<td>' + task.title + '</td>';
            taskList += '<td>' + task.description + '</td>';
            taskList += '<td>' + task.created_at + '</td>';
            taskList += '<td>' + task.due_date + '</td>';
            taskList += '<td>';
            taskList += '<button class="btn btn-sm btn-primary edit-task" data-id="' + task.id + '">Editar</button> ';
            taskList += '<button class="btn btn-sm btn-danger delete-task" data-id="' + task.id + '">Excluir</button>';
            taskList += '</td>';
            taskList += '</tr>';
          });
  
          $('#taskList').html(taskList);
        },
        error: function(xhr, status, error) {
          alert('Ocorreu um erro ao carregar as tarefas. Por favor, tente novamente.');
          console.log(xhr.responseText);
        }
      });
    }
  });
  