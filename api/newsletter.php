<?php
// Newsletter Subscription Handler
// Stores email subscriptions in JSON file

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : '';

// Validate email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Sanitize email
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

// File to store subscriptions
$dataFile = __DIR__ . '/../data/newsletter_subscriptions.json';

// Create data directory if it doesn't exist
$dataDir = dirname($dataFile);
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Load existing subscriptions
$subscriptions = [];
if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    $subscriptions = json_decode($content, true) ?: [];
}

// Check if email already exists
foreach ($subscriptions as $sub) {
    if (strtolower($sub['email']) === strtolower($email)) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'Email already subscribed']);
        exit;
    }
}

// Add new subscription
$subscriptions[] = [
    'email' => $email,
    'timestamp' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
];

// Save subscriptions
$result = file_put_contents($dataFile, json_encode($subscriptions, JSON_PRETTY_PRINT));

if ($result === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save subscription']);
    exit;
}

// Optional: Send confirmation email (requires mail server configuration)
// mail($email, 'Newsletter Subscription', 'Thank you for subscribing to VEHICLE-LAB newsletter!');

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Successfully subscribed to newsletter'
]);
?>

