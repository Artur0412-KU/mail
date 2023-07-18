#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <curl/curl.h>

#define SERVER "smtp.example.com"
#define PORT 587
#define USERNAME "your_username"
#define PASSWORD "your_password"

struct upload_status {
    int lines_read;
};

int check_response(int sockfd) {
    char buffer[1024];
    recv(sockfd, buffer, sizeof(buffer), 0);
    printf("Response: %s", buffer);
    int code = atoi(buffer);
    if (code >= 400) {
        perror("Помилка на сервері");
        return -1;
    }
    return 0;
}

int send_data(int sockfd, const char* data) {
    if (send(sockfd, data, strlen(data), 0) < 0) {
        perror("Помилка під час надсилання даних");
        return -1;
    }
    return 0;
}

int send_command(int sockfd, const char* command) {
    char buffer[1024];
    sprintf(buffer, "%s\r\n", command);
    if (send_data(sockfd, buffer) < 0) {
        return -1;
    }
    return check_response(sockfd);
}

int login(int sockfd, const char* username, const char* password) {
    if (send_command(sockfd, "EHLO localhost") < 0) {
        return -1;
    }
    if (send_command(sockfd, "STARTTLS") < 0) {
        return -1;
    }

    // Встановлюємо SSL/TLS-з'єднання
    SSL_CTX* ctx = SSL_CTX_new(TLS_client_method());
    SSL* ssl = SSL_new(ctx);
    SSL_set_fd(ssl, sockfd);
    if (SSL_connect(ssl) != 1) {
        perror("Ошибка при установке SSL/TLS-соединения");
        SSL_free(ssl);
        SSL_CTX_free(ctx);
        close(sockfd);
        return -1;
    }

    // Авторизація
    if (send_command(sockfd, "EHLO localhost") < 0) {
        SSL_free(ssl);
        SSL_CTX_free(ctx);
        close(sockfd);
        return -1;
    }
    if (send_command(sockfd, "AUTH LOGIN") < 0) {
        SSL_free(ssl);
        SSL_CTX_free(ctx);
        close(sockfd);
        return -1;
    }
    if (send_command(sockfd, username) < 0) {
        SSL_free(ssl);
        SSL_CTX_free(ctx);
        close(sockfd);
        return -1;
    }
    if (send_command(sockfd, password) < 0) {
        SSL_free(ssl);
        SSL_CTX_free(ctx);
        close(sockfd);
        return -1;
    }

    SSL_free(ssl);
    SSL_CTX_free(ctx);

    return 0;
}

int attach_file(int sockfd, const char* file_path) {
    char buffer[1024];
    FILE* file = fopen(file_path, "r");
    if (file == NULL) {
        perror("Помилка під час відкриття файлу");
        return -1;
    }

    sprintf(buffer, "Content-Type: application/octet-stream\r\n");
    if (send_data(sockfd, buffer) < 0) {
        fclose(file);
        return -1;
    }

    sprintf(buffer, "Content-Disposition: attachment; filename=\"%s\"\r\n\r\n", file_path);
    if (send_data(sockfd, buffer) < 0) {
        fclose(file);
        return -1;
    }

    char file_buffer[1024];
    size_t bytes_read;
    while ((bytes_read = fread(file_buffer, 1, sizeof(file_buffer), file)) > 0) {
        if (send(sockfd, file_buffer, bytes_read, 0) < 0) {
            perror("Помилка під час надсилання вкладення");
            fclose(file);
            return -1;
        }
    }

    fclose(file);
    return 0;
}

int send_mail(const char* from, const char* to, const char* subject, const char* body, const char* attachment, int is_html) {
    int sockfd;
    struct sockaddr_in server_addr;

    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) {
        perror("Помилка під час створення сокета");
        return -1;
    }

    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    if (inet_pton(AF_INET, SERVER, &server_addr.sin_addr) <= 0) {
        perror("Помилка під час перетворення адреси");
        close(sockfd);
        return -1;
    }

    if (connect(sockfd, (struct sockaddr*)&server_addr, sizeof(server_addr)) < 0) {
        perror("Помилка під час підключення до сервера");
        close(sockfd);
        return -1;
    }

    if (check_response(sockfd) < 0) {
        close(sockfd);
        return -1;
    }

    if (login(sockfd, USERNAME, PASSWORD) < 0) {
        close(sockfd);
        return -1;
    }

    if (send_command(sockfd, "MAIL FROM: <from@example.com>") < 0) {
        close(sockfd);
        return -1;
    }

    if (send_command(sockfd, "RCPT TO: <to@example.com>") < 0) {
        close(sockfd);
        return -1;
    }

    if (send_command(sockfd, "DATA") < 0) {
        close(sockfd);
        return -1;
    }

    char buffer[1024];

    sprintf(buffer, "From: %s\r\n", from);
    send_data(sockfd, buffer);

    sprintf(buffer, "To: %s\r\n", to);
    send_data(sockfd, buffer);

    sprintf(buffer, "Subject: %s\r\n", subject);
    send_data(sockfd, buffer);

    if (is_html) {
        sprintf(buffer, "Content-Type: text/html; charset=utf-8\r\n");
        send_data(sockfd, buffer);
    }

    if (attachment != NULL) {
        attach_file(sockfd, attachment);
    }

    sprintf(buffer, "%s\r\n.\r\n", body);
    send_data(sockfd, buffer);

    send_command(sockfd, "QUIT");

    close(sockfd);
    return 0;
}

int main() {
    const char* from = "sender@example.com";
    const char* to = "recipient@example.com";
    const char* subject = "Тема письма";
    const char* body = "<h1>Привіт!</h1><p>Це тіло листа у форматі HTML.</p>";
    const char* attachment = "path/to/attachment.txt";

    int is_html = 1; // Встановіть 0, якщо хочете надіслати текстовий лист без форматування HTML

    if (send_mail(from, to, subject, body, attachment, is_html) == 0) {
        printf("Лист успішно надіслано!\n");
    } else {
        printf("Помилка під час надсилання листа\n");
    }

    return 0;
}
