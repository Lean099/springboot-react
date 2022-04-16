package com.leandro.backend.service;

import com.leandro.backend.models.Response;
import com.leandro.backend.repository.ResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ResponseService {

    @Autowired
    private ResponseRepository responseRepository;

    public Response createResponseToQuestion(Response response, String idQuestion){
        response.setId_question(idQuestion);
        return responseRepository.save(response);
    }

    public List<Response> getAllResponse(){
        return responseRepository.findAll();
    }

    public Response getResponseToQuestion(String idResponse){
        return responseRepository.getById(idResponse);
    }

    @Transactional
    public Response modifyResponse(String idResponse, String content){
        responseRepository.updateContentResponse(idResponse, content);
        return getResponseToQuestion(idResponse);
    }

    public String deleteResponse(String idResponse){
        responseRepository.deleteById(idResponse);
        return "Response deleted";
    }

}
