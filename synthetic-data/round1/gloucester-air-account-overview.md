# Account Overview — Gloucester Air

*Prepared by the DXC pursuit team, 2026-06-12. SYNTHETIC DEMO DATA — all names, companies and figures are fictional.*

## The customer

Gloucester Air is a UK regional carrier: 62 aircraft, ~4,800 staff, hubs at
Gloucestershire and Manchester, ~11m passengers/year. Growing 9% YoY after
absorbing two smaller regional routes networks. IT estate has grown by
acquisition and is fragmented.

## Their IT estate (what we know)

- **ITSM:** ServiceNow (18 months in, heavily customised, CIO's flagship project)
- **Observability:** Dynatrace for core apps; Nagios still on legacy ground-ops systems
- **Ops systems:** Sabre for reservations; in-house crew scheduling system ("ROSTA",
  15 years old, two engineers who understand it); SITA messaging for ground handling
- **Infra:** ~60% on-prem (two DCs), AWS for customer-facing web/mobile
- **Ops model:** 24/7 NOC outsourced to incumbent MSP "Calder IT Services" —
  contract expires March 2027. Ticket volume ~14,000/month, 70% estimated
  repetitive/automatable.

## Key stakeholders

| Person | Role | Disposition |
| --- | --- | --- |
| Priya Nair | Head of IT Operations | **Our champion.** Frustrated with Calder's response times; asked for the OASIS briefing. Route everything through her. |
| Fiona Aldridge | CIO | Economic buyer. Protective of the ServiceNow investment; sceptical of "another platform". |
| Douglas Petty | Head of Flight Ops | Influencer. Cares only about disruption recovery times. |

## The opportunity

Position DXC OASIS as the agentic operations layer **above** their existing
tools — unify ServiceNow + Dynatrace + Nagios + SITA signals into one view,
put agents on the repetitive 70% of NOC tickets, and give Flight Ops
predictive warning of IT-driven disruption. Potential to displace Calder at
contract renewal (March 2027). Est. deal size £6–8m over 3 years.
