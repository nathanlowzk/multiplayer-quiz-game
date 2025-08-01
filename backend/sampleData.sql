use quiz;

INSERT INTO questions (
    questionText, 
    optionA, 
    optionB, 
    optionC, 
    optionD, 
    correctAnswer, 
    category
) VALUES
('What is the capital of France?', 'London', 'Berlin', 'Paris', 'Madrid', 2, 'Geography'),
('What is 2 + 2?', '3', '4', '5', '6', 1, 'Math'),
('What color is the sky?', 'Red', 'Blue', 'Green', 'Yellow', 1, 'Science'),
('Which dish belongs to spanish cuisine?', 'Calamari', 'Arancini', 'Patatas Bravas', 'Quesedilla');