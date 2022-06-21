package com.leandro.backend.controllers;

import com.leandro.backend.models.Question;
import com.leandro.backend.models.User;
import com.leandro.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @RequestMapping(value = "api/question/create/userId/{idUser}", method = RequestMethod.POST)
    public Question createQuestion(@PathVariable("idUser") String idUser, @RequestBody Question question){
        return questionService.createQuestion(question, idUser);
    }

    @RequestMapping(value = "api/question/", method = RequestMethod.GET)
    public List<Question> getAllQuestions(){
        return questionService.getAllQuestions();
    }

    @RequestMapping(value = "api/question/findAllByIdUserQuestion/", method = RequestMethod.GET)
    public List<Question> getAllByIdUserQuestions(@RequestBody User idUserQuestion){
        return questionService.getAllByIdUserQuestions(idUserQuestion);
    }

    @RequestMapping(value = "api/question/findAllQuestionsRelatedToAnswers/", method = RequestMethod.GET)
    public List<Question> getAllQuestionsRelatedToAnswers(@RequestBody User idUser){
        return questionService.findAllQuestionsRelatedToAnswers(idUser);
    }

    @RequestMapping(value = "api/question/{id}", method = RequestMethod.GET)
    public Optional<Question> getQuestion(@PathVariable String id){
        return questionService.findOneQuestion(id);
    }

    @RequestMapping(value = "api/question/{id}", method = RequestMethod.POST)
    public Optional<Question> modifyQuestion(@PathVariable String id, @RequestBody Question content){
        return questionService.modifyContentQuestion(id, content.getContent());
    }

    @RequestMapping(value = "api/question/{id}", method = RequestMethod.DELETE)
    public String deleteQuestion(@PathVariable String id){
        return questionService.deleteQuestion(id);
    }

    @RequestMapping(value = "api/allQuestions/{id}", method = RequestMethod.DELETE)
    public String deleteAllQuestion(@PathVariable String id){
        questionService.deleteAllUserQuestions(id);
        return "ok";
    }
}
