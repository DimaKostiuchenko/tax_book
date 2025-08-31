<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Підтвердження Email - Tax Book</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #344CB7 0%, #577BC1 50%, #A594F9 100%);
            padding: 40px 30px;
            text-align: center;
        }
        .logo {
            background-color: #ffffff;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            font-weight: bold;
            font-size: 24px;
            color: #344CB7;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #374151;
        }
        .message {
            font-size: 16px;
            margin-bottom: 30px;
            color: #6b7280;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #344CB7 0%, #577BC1 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            text-align: center;
        }
        .button:hover {
            background: linear-gradient(135deg, #577BC1 0%, #A594F9 100%);
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer p {
            margin: 0;
            color: #6b7280;
            font-size: 14px;
        }
        .warning {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            color: #92400e;
            font-size: 14px;
        }
        .link {
            color: #344CB7;
            text-decoration: none;
        }
        .link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">TB</div>
            <h1>Tax Book</h1>
        </div>
        
        <div class="content">
            <div class="greeting">
                Вітаємо, {{ $user->name }}!
            </div>
            
            <div class="message">
                Дякуємо за реєстрацію в Tax Book! Для завершення реєстрації та активації вашого облікового запису, будь ласка, підтвердіть вашу email адресу.
            </div>
            
            <div style="text-align: center;">
                <a href="{{ $verificationUrl }}" class="button">
                    Підтвердити Email
                </a>
            </div>
            
            <div class="warning">
                <strong>Важливо:</strong> Це посилання дійсне протягом 24 годин. Якщо ви не можете натиснути кнопку, скопіюйте та вставте це посилання у ваш браузер:
                <br><br>
                <a href="{{ $verificationUrl }}" class="link">{{ $verificationUrl }}</a>
            </div>
            
            <div class="message">
                Якщо ви не створювали обліковий запис в Tax Book, просто проігноруйте це повідомлення.
            </div>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} Tax Book. Всі права захищені.</p>
            <p>Це автоматичне повідомлення, будь ласка, не відповідайте на нього.</p>
        </div>
    </div>
</body>
</html>
