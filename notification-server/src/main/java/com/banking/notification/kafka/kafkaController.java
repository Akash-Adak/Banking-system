package com.banking.notification.kafka;

//import com.banking.user.model.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/messages")
public class kafkaController {

    @Autowired
    private KafkaTemplate<String,String> kafkaTemplate;

    @PostMapping
    public void publish(@RequestBody MessageRequest request){

        kafkaTemplate.send("user",request.message());
    }
}
