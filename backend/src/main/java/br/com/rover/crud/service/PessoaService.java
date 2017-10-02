package br.com.rover.crud.service;

import br.com.rover.crud.domain.Pessoa;
import br.com.rover.crud.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaService {

    //@Autowired
    private PessoaRepository pessoaRepository;

    public PessoaService(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    public List<Pessoa> findAll() {
        return this.pessoaRepository.findAll();
    }

    public Pessoa save(Pessoa pessoa) {
        return this.pessoaRepository.save(pessoa);
    }

    public boolean delete(Pessoa pessoa) {
        try {
            this.pessoaRepository.delete(pessoa);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
