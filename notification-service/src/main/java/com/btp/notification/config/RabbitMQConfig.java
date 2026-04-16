package com.btp.notification.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "btp.events";
    public static final String QUEUE    = "btp.notifications";

    @Bean
    public TopicExchange btpExchange() {
        return new TopicExchange(EXCHANGE, true, false);
    }

    @Bean
    public Queue notificationQueue() {
        return QueueBuilder.durable(QUEUE).build();
    }

    @Bean
    public Binding bindingPlan(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("plan.#");
    }

    @Bean
    public Binding bindingControle(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("controle.#");
    }

    @Bean
    public Binding bindingVisa(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("visa.#");
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter(ObjectMapper objectMapper) {
        return new Jackson2JsonMessageConverter(objectMapper);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
                                         Jackson2JsonMessageConverter messageConverter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter);
        return template;
    }
}
