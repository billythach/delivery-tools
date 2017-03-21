package com.lyra.delivery.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import com.lyra.delivery.domain.enumeration.IssueStatus;

/**
 * A Issue.
 */
@Entity
@Table(name = "issue")
public class Issue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private IssueStatus status;

    @ManyToOne
    private Deployment deployment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Issue title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Issue description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public IssueStatus getStatus() {
        return status;
    }

    public Issue status(IssueStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(IssueStatus status) {
        this.status = status;
    }

    public Deployment getDeployment() {
        return deployment;
    }

    public Issue deployment(Deployment deployment) {
        this.deployment = deployment;
        return this;
    }

    public void setDeployment(Deployment deployment) {
        this.deployment = deployment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Issue issue = (Issue) o;
        if (issue.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, issue.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Issue{" +
            "id=" + id +
            ", title='" + title + "'" +
            ", description='" + description + "'" +
            ", status='" + status + "'" +
            '}';
    }
}
