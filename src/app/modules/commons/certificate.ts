export class Certificate {

  constructor(issuerInfo: string, thumbprint: string, validFrom: Date, validTo: Date, subjectInfo: string) {
    this.Thumbprint = thumbprint;
    this.ValidFrom = validFrom;
    this.ValidTo = validTo;
    this.SubjectInfo = subjectInfo;
    this.Issuer = issuerInfo.substring(0, issuerInfo.indexOf(','));
    this.DisplayText = `${this.SubjectInfo};Выдан ${this.Issuer};Действителен с ${this.ValidFrom.toLocaleDateString()} по ${this.ValidTo.toLocaleDateString()}`;
  }
  public Thumbprint: string;
  public ValidFrom: Date;
  public ValidTo: Date;
  public SubjectInfo: string;
  public DisplayText: string;
  public Issuer: string;
}
