// Dimension checklist: inquiry fields, NOT supplier-certified ranges.
// Representative dimensions in products.js remain examples only.
export const dimensionFields = {
 pipe: [
  ['Outside diameter (OD)','mm','Nominal and actual OD; dimensional tolerance'],
  ['Wall thickness (WT)','mm','Nominal and minimum wall; tolerance'],
  ['Inside diameter (ID)','mm','Derived from certified OD and WT'],
  ['Cut / random length','mm / m','Length and cutting tolerance'],
  ['Weight per metre','kg/m','Calculated from certified measurements and density'],
  ['Straightness / ovality','mm','Agreed inspection tolerances'],
  ['Ends & treatment','—','Plain, bevelled or threaded; surface finish'],
  ['Hydrostatic / NDT testing','—','According to the governing standard and order'],
  ['Grade / heat number','—','Mill test certificate and traceability'],
  ['Operating service','—','Mechanical, structural, pressure or line pipe: specify independently']
 ],
 coil: [
  ['Base metal thickness (BMT)','mm','Without coating; distinguish from total coated thickness'],
  ['Total coated thickness (TCT)','mm','Where applicable, include both faces/coatings'],
  ['Strip width / slit width','mm','Tolerance and edge condition'],
  ['Coil inner diameter (ID)','mm','Required mandrel compatibility'],
  ['Coil outer diameter (OD)','mm','Maximum handling and storage envelope'],
  ['Coil weight','kg / t','Minimum and maximum per coil'],
  ['Coating mass','g/m²','Per relevant designation and test method'],
  ['Paint system','µm','Primer / topcoat / backcoat if prepainted'],
  ['Surface / finish','—','Spangle, passivation, oil, gloss, color code'],
  ['Mechanical properties','MPa / %','Yield, tensile and elongation by steel grade'],
  ['Flatness & camber','mm','According to manufacturing tolerance'],
  ['Packaging','—','Eye-to-sky/side, wrapping and edge protection']
 ],
 sheet: [
  ['Thickness','mm','Specify BMT versus coated total thickness'],
  ['Sheet width','mm','Full and usable width where profiled'],
  ['Sheet length','mm','Cut tolerance'],
  ['Plate mass','kg','Calculated from actual dimensions/density'],
  ['Coating / surface','—','Galvanized, Al-Zn, painted, as applicable'],
  ['Flatness / camber','mm','Agreed tolerances'],
  ['Yield / tensile / elongation','MPa / %','Grade and test direction'],
  ['Hardness / wear grade','HBW','Only for tested wear-resistant grade'],
  ['Edge and delivery condition','—','Sheared, mill edge, trimmed; finish'],
  ['Inspection document','—','Test certificate / chemical analysis / traceability']
 ],
 corrugated: [
  ['Base metal thickness','mm','Substrate thickness versus total coated thickness'],
  ['Overall width','mm','Actual measured width'],
  ['Effective cover width','mm','After side-lap overlap'],
  ['Sheet length','mm','Custom cut and tolerance'],
  ['Pitch / rib spacing','mm','Profile-specific drawing'],
  ['Rib height / depth','mm','Profile-specific drawing'],
  ['Coating designation','g/m²','Zinc or aluminium-zinc substrate'],
  ['Paint / colour','µm / RAL','Front/back system if prepainted'],
  ['Profile geometry','—','Corrugated or trapezoidal, with drawing'],
  ['Fastening / application','—','Roofing or cladding requirements']
 ],
 bar: [
  ['Bar diameter / across-flats','mm','Round, square or hexagonal section'],
  ['Width × thickness','mm','Flat-bar section'],
  ['Bar length','mm','Stock / cut length and tolerance'],
  ['Straightness','mm/m','Specified deviation'],
  ['Diameter / section tolerance','mm','Hot-rolled versus cold-drawn tolerance'],
  ['Surface condition','—','Black, bright, ground or peeled'],
  ['Steel grade / heat treatment','—','Mill-certified chemistry and condition'],
  ['Mechanical test','MPa / %','Yield, tensile, elongation by grade']
 ],
 structural: [
  ['Section designation','—','I / H / U / equal-angle / hollow profile'],
  ['Section width & depth','mm','Actual section dimensions'],
  ['Web / flange thickness','mm','As applicable'],
  ['Wall / leg thickness','mm','For hollow/angle profiles'],
  ['Length','mm / m','Standard or cut-to-length'],
  ['Mass per metre','kg/m','Profile standard or certified section'],
  ['Straightness / squareness','mm','Relevant product tolerance'],
  ['Grade / surface','—','Certificate and protective treatment']
 ],
 rebar: [
  ['Nominal bar diameter','mm','Diameter based on certified mass per metre'],
  ['Bar length','m','Cut-length tolerance'],
  ['Rib profile / geometry','mm','Rib height, pitch and relative rib area'],
  ['Mass per metre','kg/m','Nominal and test tolerance'],
  ['Steel grade / ductility','—','According to relevant local standard'],
  ['Yield / tensile / elongation','MPa / %','Certified mechanical properties'],
  ['Bending / rebend','—','Test results where required']
 ],
 wire: [
  ['Wire diameter','mm','Nominal and tolerance'],
  ['Coil inner / outer diameter','mm','Bundle envelope'],
  ['Coil weight','kg / t','Single strapped bundle'],
  ['Wire finish / quality','—','Wire-rod grade and surface'],
  ['Tensile / chemical composition','MPa / %','Grade and heat certificate'],
  ['Tie / straps','—','Bundling and packing specification']
 ]
}
export const technicalKind = p => {
 const s=p.model3d?.shape||p.shape||'sheet'
 return ['flatbar','squarebar','hexbar','tee','custom'].includes(s)?'bar':
        ['angle','box','beam'].includes(s)?'structural':s
}
export const dimensionChecklist = p => dimensionFields[technicalKind(p)] || dimensionFields.sheet
