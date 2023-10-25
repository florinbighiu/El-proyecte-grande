package com.elproyectegrande.model;

public class EmailData {

    private String body;
    private String subject;

    private String contactedEmail;

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContactedEmail() {
        return contactedEmail;
    }

    public void setContactedEmail(String contactedEmail) {
        this.contactedEmail = contactedEmail;
    }
}
