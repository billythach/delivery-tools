package com.lyra.delivery.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DeployCommandLine.
 */
@Entity
@Table(name = "deploy_command_line")
public class DeployCommandLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pattern")
    private String pattern;

    @ManyToOne
    private Application application;

    @ManyToOne
    private Plateform plateform;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPattern() {
        return pattern;
    }

    public DeployCommandLine pattern(String pattern) {
        this.pattern = pattern;
        return this;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public Application getApplication() {
        return application;
    }

    public DeployCommandLine application(Application application) {
        this.application = application;
        return this;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Plateform getPlateform() {
        return plateform;
    }

    public DeployCommandLine plateform(Plateform plateform) {
        this.plateform = plateform;
        return this;
    }

    public void setPlateform(Plateform plateform) {
        this.plateform = plateform;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DeployCommandLine deployCommandLine = (DeployCommandLine) o;
        if (deployCommandLine.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, deployCommandLine.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "DeployCommandLine{" +
            "id=" + id +
            ", pattern='" + pattern + "'" +
            '}';
    }
}
