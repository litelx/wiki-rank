import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ERole, Node } from '../app.model';
import { TreeService } from '../tree.servise';

@Component({
    selector: 'node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
    @ViewChildren("options") options: QueryList<ElementRef>;
    @ViewChildren("icons") iconsTags: QueryList<ElementRef>;

    ARIA_EXPANDED: string = "aria-expanded";
    iconsMap: Map<string, ElementRef>;

    node: Node[];
    role: ERole = ERole.Table; // Init permissions hard coded
    roles = ERole;
    permission = Object.values(ERole).splice(0, Object.keys(ERole).length / 2);

    constructor(private treeService: TreeService, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.node = this.treeService.generateTreeByRole(this.role);
    }

    ngAfterViewInit(): void {
        this.iconsMap = new Map<string, ElementRef>();
        this.iconsTags.forEach((eleRef: ElementRef) => {
            this.iconsMap.set(eleRef.nativeElement.id, eleRef);
        });
    }

    collapsedState(item: any): string {
        if (item != null && item.child != null && item.child.length > 0) {
            item.ariaExpanded = "false";
            return "false";
        }
        item.ariaExpanded = null;
        return null;
    }

    toggleSelection($event: any, item: Node): void {

        $event.stopImmediatePropagation();
        $event.preventDefault();

        this.options.some((eleRef: ElementRef) => {
            const id = eleRef.nativeElement.getAttribute("id")
            if (id == item.id && this.role > item.role) {
                let isExpanded = eleRef.nativeElement.getAttribute(this.ARIA_EXPANDED);
                this.setElementAttribute(eleRef, this.ARIA_EXPANDED, (isExpanded == "true") ? "false" : "true");
                return true;
            }
        });

    }

    setElementAttribute(eleRef: ElementRef, attribute: string, value: string): void {
        this.renderer.setAttribute(eleRef.nativeElement, attribute, value);
        const icon = eleRef.nativeElement.querySelector('i');
        const iconEleRef = this.iconsMap.get(icon.id);
        if (!iconEleRef) return;
        iconEleRef.nativeElement.className = value == 'true' ? 'fas fa-angle-down' : 'fas fa-angle-right';
    }

    choose(role: ERole): void {
        this.role = role;
        this.node = this.treeService.generateTreeByRole(this.role);
    }

    public getIconUrl(item: Node): string {
        switch (item.role) {
            case ERole.Connection:
                return '../../assets/img/connection.svg';
            case ERole.Database:
                return '../../assets/img/database.svg';
            case ERole.Schema:
                return '../../assets/img/schema.svg';
            case ERole.Table:
                return '../../assets/img/table.png';
            case ERole.Column:
                return '../../assets/img/column.svg';
            default:
                return '';
        }

    }
}
