-- Insert test data for users with all fields
INSERT INTO users (username, email, password_hash, role, blocked_at, created_at)
VALUES 
('user1', 'user1@example.com', 'password1', 'user', NULL, '2023-01-01 10:00:00'),
('user2', 'user2@example.com', 'password2', 'user', NULL, '2023-01-02 11:00:00'),
('user3', 'user3@example.com', 'password3', 'user', NULL, '2023-01-03 12:00:00'),
('user4', 'user4@example.com', 'password4', 'user', NULL, '2023-01-04 13:00:00'),
('user5', 'user5@example.com', 'password5', 'user', NULL, '2023-01-05 14:00:00'),
('user6', 'user6@example.com', 'password6', 'user', NULL, '2023-01-06 15:00:00'),
('user7', 'user7@example.com', 'password7', 'user', NULL, '2023-01-07 16:00:00'),
('user8', 'user8@example.com', 'password8', 'user', NULL, '2023-01-08 17:00:00'),
('user9', 'user9@example.com', 'password9', 'user', NULL, '2023-01-09 18:00:00'),
('user10', 'user10@example.com', 'password10', 'user', NULL, '2023-01-10 19:00:00');

-- Insert test data for articles with all fields
INSERT INTO articles (user_id, title, content, blocked_at, created_at)
VALUES 
(1, 'First Article', 'This is the content of the first article.', NULL, '2023-01-01 10:00:00'),
(1, 'Second Article', 'This is the content of the second article.', NULL, '2023-01-02 11:00:00'),
(2, 'Another Article', 'This is another article written by user2.', NULL, '2023-01-03 12:00:00'),
(3, 'Third Article', 'This is the content of the third article.', NULL, '2023-01-04 13:00:00'),
(4, 'Fourth Article', 'This is the content of the fourth article.', NULL, '2023-01-05 14:00:00'),
(5, 'Fifth Article', 'This is the content of the fifth article.', NULL, '2023-01-06 15:00:00'),
(6, 'Sixth Article', 'This is the content of the sixth article.', NULL, '2023-01-07 16:00:00'),
(7, 'Seventh Article', 'This is the content of the seventh article.', NULL, '2023-01-08 17:00:00'),
(8, 'Eighth Article', 'This is the content of the eighth article.', NULL, '2023-01-09 18:00:00'),
(9, 'Ninth Article', 'This is the content of the ninth article.', NULL, '2023-01-10 19:00:00');

-- Insert test data for comments with all fields
INSERT INTO comments (user_id, article_id, content, blocked_at, created_at)
VALUES 
(2, 1, 'This is a comment on the first article by user2.', NULL, '2023-01-01 10:00:00'),
(3, 1, 'This is another comment on the first article by user3.', NULL, '2023-01-02 11:00:00'),
(1, 3, 'This is a comment on the third article by user1.', NULL, '2023-01-03 12:00:00'),
(4, 2, 'This is a comment on the second article by user4.', NULL, '2023-01-04 13:00:00'),
(5, 3, 'This is a comment on the third article by user5.', NULL, '2023-01-05 14:00:00'),
(6, 4, 'This is a comment on the fourth article by user6.', NULL, '2023-01-06 15:00:00'),
(7, 5, 'This is a comment on the fifth article by user7.', NULL, '2023-01-07 16:00:00'),
(8, 6, 'This is a comment on the sixth article by user8.', NULL, '2023-01-08 17:00:00'),
(9, 7, 'This is a comment on the seventh article by user9.', NULL, '2023-01-09 18:00:00'),
(10, 8, 'This is a comment on the eighth article by user10.', NULL, '2023-01-10 19:00:00');

-- Insert test data for reports with all fields
INSERT INTO reports (reporter_id, target_type, target_id, reason, created_at)
VALUES 
(2, 'article', 1, 'Inappropriate content in the first article.', '2023-01-01 10:00:00'),
(3, 'comment', 1, 'Spam comment on the first article.', '2023-01-02 11:00:00'),
(4, 'article', 2, 'Offensive content in the second article.', '2023-01-03 12:00:00'),
(5, 'comment', 2, 'Irrelevant comment on the second article.', '2023-01-04 13:00:00'),
(6, 'article', 3, 'Misleading information in the third article.', '2023-01-05 14:00:00'),
(7, 'comment', 3, 'Harassment in the third article comment.', '2023-01-06 15:00:00'),
(8, 'article', 4, 'Plagiarism in the fourth article.', '2023-01-07 16:00:00'),
(9, 'comment', 4, 'Spam in the fourth article comment.', '2023-01-08 17:00:00'),
(10, 'article', 5, 'Inappropriate language in the fifth article.', '2023-01-09 18:00:00'),
(1, 'comment', 5, 'Offensive comment on the fifth article.', '2023-01-10 19:00:00');

-- Insert test data for article ratings with all fields
INSERT INTO article_ratings (user_id, article_id, is_like, created_at)
VALUES 
(2, 1, TRUE, '2023-01-01 10:00:00'),
(3, 1, FALSE, '2023-01-02 11:00:00'),
(1, 3, TRUE, '2023-01-03 12:00:00'),
(4, 2, TRUE, '2023-01-04 13:00:00'),
(5, 3, FALSE, '2023-01-05 14:00:00'),
(6, 4, TRUE, '2023-01-06 15:00:00'),
(7, 5, TRUE, '2023-01-07 16:00:00'),
(8, 6, FALSE, '2023-01-08 17:00:00'),
(9, 7, TRUE, '2023-01-09 18:00:00'),
(10, 8, TRUE, '2023-01-10 19:00:00');

-- Insert test data for comment ratings with all fields
INSERT INTO comment_ratings (user_id, comment_id, is_like, created_at)
VALUES 
(1, 1, TRUE, '2023-01-01 10:00:00'),
(3, 1, FALSE, '2023-01-02 11:00:00'),
(2, 3, TRUE, '2023-01-03 12:00:00'),
(4, 2, TRUE, '2023-01-04 13:00:00'),
(5, 3, FALSE, '2023-01-05 14:00:00'),
(6, 4, TRUE, '2023-01-06 15:00:00'),
(7, 5, TRUE, '2023-01-07 16:00:00'),
(8, 6, FALSE, '2023-01-08 17:00:00'),
(9, 7, TRUE, '2023-01-09 18:00:00'),
(10, 8, TRUE, '2023-01-10 19:00:00');
