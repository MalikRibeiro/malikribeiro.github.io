<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'subject', 'message'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $errors[] = "Campo '$field' é obrigatório";
    }
}

// Validate email format
if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email inválido';
}

// Return validation errors
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados inválidos', 'details' => $errors]);
    exit();
}

// Sanitize input data
$name = htmlspecialchars(trim($input['name']));
$email = htmlspecialchars(trim($input['email']));
$subject = htmlspecialchars(trim($input['subject']));
$message = htmlspecialchars(trim($input['message']));

// Email configuration
$to = 'malik.ribeiro@email.com'; // Replace with actual email
$email_subject = "Portfolio Contact: " . $subject;

// Email body
$email_body = "
Nova mensagem do portfolio:

Nome: $name
Email: $email
Assunto: $subject

Mensagem:
$message

---
Enviado em: " . date('d/m/Y H:i:s') . "
IP: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = [
    'From: noreply@malikribeiro.dev',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Try to send email
$mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Log successful submission (optional)
    $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from $name ($email)\n";
    file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true,
        'message' => 'Mensagem enviada com sucesso! Retornarei em breve.'
    ]);
} else {
    // Log failed submission
    $log_entry = date('Y-m-d H:i:s') . " - FAILED contact form submission from $name ($email)\n";
    file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Erro interno do servidor',
        'message' => 'Não foi possível enviar a mensagem. Tente novamente mais tarde.'
    ]);
}
?>

