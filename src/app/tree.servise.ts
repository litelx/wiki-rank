import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ELevel, ERole, Node } from './app.model';
// import {* as nodes} from '../../server/mock/nodes.json';
// var nodes = require('./nodes.json')

@Injectable({
    providedIn: 'root'
})
export class TreeService {

    constructor(private httpClient: HttpClient) { }

    public generateTreeByRole(role: ERole): Node[] {
        const connections = this.createConnections(4);
        if (role > ERole.Connection) {
            connections.forEach(con => {
                con.child = [];
                this.createChild(con);
                this.createChild(con);
                this.createChild(con);
                if (role > ERole.Database) {
                    con.child.forEach(db => {
                        db.child = [];
                        this.createChild(db);
                        this.createChild(db);
                        this.createChild(db);
                        if (role > ERole.Schema) {
                            db.child.forEach(sc => {
                                sc.child = [];
                                this.createChild(sc);
                                this.createChild(sc);
                                this.createChild(sc);
                                if (role > ERole.Table) {
                                    sc.child.forEach(tb => {
                                        tb.child = [];
                                        this.createChild(tb);
                                        this.createChild(tb);
                                        this.createChild(tb);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
        return connections;
    }

    private createChild(parent: Node) {
        if (parent) {
            const id = +('' + parent.id + (parent.child.length + 1));
            const child = new Node(id, parent.depth + 1, parent.role + 1, ERole[parent.role + 1] + `_${id}`, parent);
            parent.child.push(child);
        }
    }

    private createConnections(count: number): Node[] {
        const connections = [];
        for (let i = 0; i < count; i++) {
            connections.push(new Node(i + 1, ELevel.Connection, ERole.Connection, ERole[ERole.Connection] + `_${i + 1}`, null));
        }
        return connections;
    }
}
const protocol: string = 'http';
const baseUrl: string = 'localhost';
const port: string = '3000';

const url: string = `${protocol}://${baseUrl}:${port}`;
