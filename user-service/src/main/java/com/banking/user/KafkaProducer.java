@Service
public class KafkaProducer {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendUserCreatedEvent(User user) {
        kafkaTemplate.send("user-events", "User Created: " + user.getUsername());
    }
}
