package com.leandro.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import com.leandro.backend.models.Answer;
import com.leandro.backend.models.Question;
import com.leandro.backend.models.User;
import com.leandro.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    @Lazy
    @Autowired
    private AnswerService answerService;
    @Autowired
    private EntityManager entityManager;

    public Question createQuestion(Question question, String idUser){
        User user = entityManager.getReference(User.class, idUser);
        question.setIdUserQuestion(user);
        question.setDate(new Date());
        question.setUsername(user.getUsername());
        question.setIdAnswer(null);
        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions(){
        return questionRepository.findAll();
    }

    public List<Question> getAllByIdUserQuestions(User idUserQuestion){
        return questionRepository.findAllByIdUserQuestion(idUserQuestion);
    }

    public Optional<Question> findOneQuestion(String idQuestion){
        return questionRepository.findById(idQuestion);
    }

    public List<Question> findAllQuestionsRelatedToAnswers(User idUser){
        List<Answer> answers = answerService.getAllByIdUserAnswer(idUser);
        List<String> ids = new ArrayList<>();
        answers.forEach(answer -> {
            ids.add(answer.getIdQuestion());
        });
        return questionRepository.findAllById(ids);
    }

    @Transactional
    public Optional<Question> modifyContentQuestion(String idQuestion, String content){
        questionRepository.updateContentQuestion(idQuestion, content);
        return findOneQuestion(idQuestion);
    }

    public Question modifyIdAnswer(String idQuestion, String idAnswer){
        Question question = findOneQuestion(idQuestion).get();
        if(idAnswer.isBlank()){
            question.setIdAnswer(null);
            return questionRepository.save(question);
        }else{
            question.setIdAnswer(question.getAnswer());
            return questionRepository.save(question);
        }
    }

    public String deleteQuestion(String idQuestion){
        Question question = findOneQuestion(idQuestion).get();
        if(question.getIdAnswer() != null){
            answerService.deleteAnswer(question.getIdAnswer());
        }
        questionRepository.deleteById(question.getId());
        return "Question deleted";
    }

    public void deleteAllUserQuestions(String idUser){
        List<Question> questions = getAllByIdUserQuestions(entityManager.getReference(User.class, idUser));
        questions.forEach(quest -> {
            deleteQuestion(quest.getId());
        });
    }

}
