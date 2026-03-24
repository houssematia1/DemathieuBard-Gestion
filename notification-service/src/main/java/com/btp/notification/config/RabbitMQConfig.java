package com.btp.notification.config;

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

    // Capturer tous les événements plan.* (modifié, émis, soumis, fichier ajouté, état changé...)
    @Bean
    public Binding bindingPlanAll(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("plan.#");
    }

    // Capturer tous les événements controle.* (ajouté, valide, modification...)
    @Bean
    public Binding bindingControleAll(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("controle.#");
    }

    // Capturer tous les événements visa.*
    @Bean
    public Binding bindingVisaAll(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("visa.#");
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}
