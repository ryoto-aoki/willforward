<?php
// エラー表示設定（本番環境では非表示にすることを推奨）
ini_set('display_errors', 0);
error_reporting(E_ALL);

// 日本語設定
mb_language("Japanese");
mb_internal_encoding("UTF-8");

// 送信先メールアドレス（ここを変更してください）
$to = "info@willforward.co.jp";

// 件名
$subject = "【Willforward】お問い合わせがありました";

// 送信完了後のリダイレクト先
$redirect_url = "thanks.html";

// POSTデータがない場合はリダイレクト
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: contact.html");
    exit;
}

// データの取得とサニタイズ
$name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
$furigana = htmlspecialchars($_POST['furigana'], ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
$company = htmlspecialchars($_POST['company'], ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');

// 本文の作成
$body = "以下の内容でお問い合わせがありました。\n\n";
$body .= "【お名前】\n$name\n\n";
$body .= "【フリガナ】\n$furigana\n\n";
$body .= "【メールアドレス】\n$email\n\n";
$body .= "【電話番号】\n$phone\n\n";
$body .= "【所属（会社）名】\n$company\n\n";
$body .= "【お問い合わせ内容】\n$message\n\n";
$body .= "--------------------------------------------------\n";
$body .= "送信日時: " . date("Y/m/d H:i:s") . "\n";
$body .= "--------------------------------------------------";

// ヘッダー設定
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 自動返信メール（ユーザー向け）
$auto_reply_subject = "【Willforward】お問い合わせありがとうございます";
$auto_reply_body = "$name 様\n\n";
$auto_reply_body .= "この度はお問い合わせいただき、誠にありがとうございます。\n";
$auto_reply_body .= "以下の内容で受け付けいたしました。\n";
$auto_reply_body .= "担当者より折り返しご連絡させていただきますので、今しばらくお待ちください。\n\n";
$auto_reply_body .= "--------------------------------------------------\n";
$auto_reply_body .= "【お問い合わせ内容】\n";
$auto_reply_body .= "$message\n";
$auto_reply_body .= "--------------------------------------------------\n\n";
$auto_reply_body .= "株式会社Willforward\n";
$auto_reply_body .= "https://willforward.co.jp/";

$auto_reply_headers = "From: $to\r\n";
$auto_reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// メール送信実行
$success = mb_send_mail($to, $subject, $body, $headers);

if ($success) {
    // 自動返信メール送信
    mb_send_mail($email, $auto_reply_subject, $auto_reply_body, $auto_reply_headers);
    
    // サンクスページへリダイレクト
    header("Location: $redirect_url");
    exit;
} else {
    echo "メールの送信に失敗しました。";
}
?>
