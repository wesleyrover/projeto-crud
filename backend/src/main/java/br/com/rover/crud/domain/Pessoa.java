package br.com.rover.crud.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by wesleyrover on 30/09/17.
 */
@Entity
@Table(name = "pessoa")
public class Pessoa {

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    @Column(name = "nome")
    private String nome;

    @Getter
    @Setter
    @Column(name = "idade")
    private Long idade;

    @Getter
    @Setter
    @Column(name = "CPF")
    private String cpf;

    public Pessoa(){}

    public Pessoa(Long id) {
        this.id = id;
    }

    public Pessoa(Long id, String nome, Long idade, String cpf) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cpf = cpf;
    }
}
