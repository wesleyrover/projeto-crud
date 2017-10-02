package br.com.rover.crud.controller;

import br.com.rover.crud.domain.Pessoa;
import br.com.rover.crud.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/pessoa", produces = {MediaType.APPLICATION_JSON_VALUE})
public class PessoaController {

    private PessoaService pessoaService;

    public PessoaController(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
    }

    @GetMapping(path = "/obter-todos")
    public ResponseEntity<List<Pessoa>> buscarTodos() {
        return ResponseEntity.ok(pessoaService.findAll());
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        return ResponseEntity.ok(pessoaService.delete(new Pessoa(id)));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/salvar")
    public ResponseEntity<Pessoa> salvar(@RequestBody Pessoa pessoa) {

        return ResponseEntity.ok(pessoaService.save(pessoa));
    }

    @RequestMapping(value = "/find", method = RequestMethod.GET)
    public ResponseEntity<List<Pessoa>> find(@RequestBody Pessoa pessoa) {
        List<Pessoa> lista = pessoaService.findAll().parallelStream().filter(Objects::nonNull).collect(Collectors.toList());
        if (pessoa != null && pessoa.getNome() != null) {
            lista = lista.parallelStream().filter(pessoa1 -> pessoa1.getNome().contains(pessoa.getNome())).collect(Collectors.toList());
        } else if (pessoa != null && pessoa.getIdade() != null) {
            lista = lista.parallelStream().filter(pessoa1 -> pessoa1.getIdade().equals(pessoa.getIdade())).collect(Collectors.toList());
        } else if (pessoa != null && pessoa.getCpf() != null) {
            lista = lista.parallelStream().filter(pessoa1 -> pessoa1.getCpf().contains(pessoa.getCpf())).collect(Collectors.toList());
        } else if (pessoa != null && pessoa.getNome() != null && pessoa.getCpf() != null && pessoa.getIdade() != null) {
            lista = lista.parallelStream().filter(pessoa1 -> pessoa1.getNome().contains(pessoa.getNome()) && pessoa1.getIdade().equals(pessoa.getIdade()) && pessoa1.getCpf().contains(pessoa.getCpf())).collect(Collectors.toList());
        }
        return ResponseEntity.ok(lista);
    }

    @RequestMapping(value = "/findById", method = RequestMethod.GET)
    public ResponseEntity<List<Pessoa>> find(@PathVariable("id") Long id) {
        List<Pessoa> lista = pessoaService.findAll().parallelStream().filter(Objects::nonNull).collect(Collectors.toList());
        lista = lista.parallelStream().filter(pessoa1 -> pessoa1.getId().equals(id)).collect(Collectors.toList());
        return ResponseEntity.ok(lista);
    }
}
