package br.com.rover.crud.domain;

import java.io.Serializable;

/**
 * Created by wesleyrover on 30/09/17.
 */
public interface Model<ID extends Serializable> {
    ID getID();
}
