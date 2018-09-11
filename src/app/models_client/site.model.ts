export class Site {
    //id: number;
    username: string;
    block: string;
    siteID: string;
    sitetype: string;
    notes: string;
    path: string;
    patharea: string;
    blocktype: string;
    naics: string;
    roads:string;
    /*
    roads: {
        road: [
            {
                name: String,
                length: Number,
                fixtures: [
                    {
                        count: Number,
                        fiximage: { data: Buffer, contentType: String },
                        imageurl: String,
                        description: String
                    }
                ]
            }
        ]
    },*/
    contactorg:string;
    contactname: string; 
    contactphone: string;
    contactemail:string;
    contactnotes: string;
    pathtocontact: string;
    partialparcel: boolean;
    parcels: string;
    /*
    parcels: {
        apn: String,
        parcelowner: String,
        parceladdress: String,
        parcelowneraddress: String,
        parcelpath: String,
        parcelarea: Number,
        parcelnotes:String
    },*/
    sitecomplete: boolean;
    qcnotes: string;
    sitestatus: string;
    //polypath: {type: [Number]}, // [Long, Lat]
    //htmlverified: String,
    created_at: number;
    updated_at: number;
}