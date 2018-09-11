export class Block {
        
        constructor(
        public block: string,
        public cbarea?: string,
        public cblat?: number,
        public cblon?: number,
        public cataloger?: string,
        public notes?: string,
        public qcer?: string,
        public qcnotes?: string,
        public blockstatus?: string,
        public blocktype?: string,
        public lightcount?: number,
        public updated_at?: number
        ) {}
}
