import {
  Column,
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  BeforeInsert,
} from "typeorm";
import { Agency } from "./Agency";
import { v4 as uuid } from "uuid";

// extending BaseEntity allows us to do things like User.create({})
@Entity()
export class Property extends BaseEntity {
  @PrimaryColumn("uuid") id: string;

  @Column("varchar", { length: 255, unique: true })
  ua_id: string;

  @Column("varchar", { length: 255 })
  domain: string;

  @Column("varchar", { length: 255, nullable: true })
  service_name: string;

  // Many properties belong to one agency
  @ManyToOne((_type) => Agency, (agency) => agency.id)
  @JoinColumn({ name: "agency_id" })
  agency: Agency;

  @CreateDateColumn()
  createdDate: Date;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
// insert into property ("ua_id","domain", "service_name","agency_id") values('UAID-12345','www.designsystem.gov.au','Design system','227da47e-cc53-472a-9e67-8fee3ec2c157');

// insert into property ("ua_id","domain", "service_name","agency_id") values('UAID-543221','www.observatory.service.gov.au','Observatory website','227da47e-cc53-472a-9e67-8fee3ec2c157');

// insert into property ("ua_id","domain", "service_name","agency_id") values('UAID-1234567','www.dta.gov.au','Dta webiste','227da47e-cc53-472a-9e67-8fee3ec2c157');

// insert into property ("ua_id","domain", "service_name","agency_id") values('UAID-12345342','www.data.gov.au','Data gov au','227da47e-cc53-472a-9e67-8fee3ec2c157');

// insert into property ("ua_id","domain", "service_name","agency_id") values('UAID-123453242','www.ato.gov.au','ATO website','9dd8b05d-92f9-4627-a7e1-be9cb6cf3072');

// insert into property ("ua_id","domain", "service_name","agency_id") values('UAID-98734534','www.business.gov.au','Business gov au website','9dd8b05d-92f9-4627-a7e1-be9cb6cf3072');

// insert into property ("ua_id","domain", "service_name","agency_id") values('UAID-9873234534','www.beta.ato.gov.au','Tax website beta','9dd8b05d-92f9-4627-a7e1-be9cb6cf3072');
