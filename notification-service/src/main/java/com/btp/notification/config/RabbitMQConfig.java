package com.btp.notification.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE      = "btp.events";
    public static final String QUEUE         = "btp.notifications";

    @Bean
    public TopicExchange btpExchange() {
        return new TopicExchange(EXCHANGE, true, false);
    }

    @Bean
    public Queue notificationQueue() {
        return QueueBuilder.durable(QUEUE).build();
    }

    @Bean
    public Binding bindingPlanSoumis(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("plan.soumis");
    }

    @Bean
    public Binding bindingControleRefuse(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("controle.refuse");
    }

    @Bean
    public Binding bindingControleValide(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("controle.valide");
    }

    @Bean
    public Binding bindingControleModification(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("controle.modification");
    }

    @Bean
    public Binding bindingVisaApplique(Queue notificationQueue, TopicExchange btpExchange) {
        return BindingBuilder.bind(notificationQueue).to(btpExchange).with("visa.applique");
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
