package com.leandro.backend.controllers;

import java.util.List;
import java.util.Optional;

import com.leandro.backend.models.Answer;
import com.leandro.backend.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @RequestMapping(value = "api/answer/create/questionId/{idQuestion}/user/{idUser}", method = RequestMethod.POST)
    public Answer createAnswer(@RequestBody Answer answer, @PathVariable("idQuestion") String idQuestion, @PathVariable("idUser") String idUser){
        return answerService.createAnswerToQuestion(answer, idQuestion, idUser);
    }

    @RequestMapping(value = "api/answer/", method = RequestMethod.GET)
    public List<Answer> getAllAnswer(){
        return answerService.getAllAnswer();
    }

    @RequestMapping(value = "api/answer/{id}", method = RequestMethod.GET)
    public Optional<Answer> getAnswer(@PathVariable String id){
        return answerService.getAnswerToQuestion(id);
    }

    @RequestMapping(value = "api/answer/{id}", method = RequestMethod.POST)
    public Optional<Answer> modifyAnswer(@PathVariable String id, @RequestBody Answer content){
        return answerService.modifyAnswer(id, content.getContent());
    }

    @RequestMapping(value = "api/answer/{id}", method = RequestMethod.DELETE)
    public String deleteAnswer(@PathVariable String id){
        return answerService.deleteAnswer(id);
    }

}
