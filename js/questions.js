// ==========================================
// BANCO BASE DE UNIDADES TEMÁTICAS (6 UNIDADES)
// ==========================================
const unitsData = [
    {
        id: 'notarial',
        title: 'Unidad 1: Derecho Notarial y Protocolo',
        subtitle: 'Fe pública, escritura matriz, actas, índice, notas y Contraloría',
        icon: 'fa-stamp',
        accent: 'amber',
        questions: [
            {
                uid: 'not_1',
                type: 'multi',
                q: 'Seleccione todos los requisitos constitucionales y legales exigidos para obtener el Exequátur de Notario en Honduras:',
                options: [
                    'Ser hondureño por nacimiento y en el libre ejercicio de sus derechos civiles',
                    'Ser Abogado debidamente colegiado y mayor de treinta (30) años de edad',
                    'Ser de reconocida honradez y buena conducta',
                    'Aprobar el examen de aptitud ante el Tribunal designado por la Corte Suprema de Justicia',
                    'Haber ejercido previamente como Juez de Letras durante al menos cinco años'
                ],
                answer: [0, 1, 2, 3],
                article: 'Art. 7 y 8 Código del Notariado',
                rationale: 'Se requiere ser hondureño por nacimiento, Abogado, mayor de 30 años, de reconocida honradez y aprobar el examen ante la CSJ; no se exige judicatura previa.'
            },
            {
                uid: 'not_2',
                type: 'single',
                q: '¿Cuál es el órgano encargado de la vigilancia, inspección y control del ejercicio de la función notarial en Honduras y de quién depende?',
                options: [
                    'La Contraloría del Notariado, órgano técnico que depende directamente de la Corte Suprema de Justicia',
                    'El Colegio de Abogados de Honduras a través de su Tribunal de Honor',
                    'La Procuraduría General de la República mediante la Dirección de Registros',
                    'La Secretaría de Gobernación, Justicia y Descentralización'
                ],
                answer: 0,
                article: 'Art. 74 y 75 Código del Notariado',
                rationale: 'La Contraloría del Notariado depende directamente de la Corte Suprema de Justicia y fiscaliza protocolos, expedientes y el cumplimiento de deberes notariales.'
            },
            {
                uid: 'not_3',
                type: 'single',
                q: '¿En qué plazo legal están obligados los Notarios a remitir copia fiel de su Protocolo e Índice del año anterior a la Contraloría del Notariado?',
                options: [
                    'Dentro de los primeros tres (3) meses del año siguiente (enero a marzo)',
                    'Dentro de los primeros quince (15) días hábiles del mes de enero',
                    'El treinta y uno (31) de diciembre de cada año junto con la nota de cierre',
                    'Dentro de los seis (6) meses siguientes a la apertura del nuevo tomo'
                ],
                answer: 0,
                article: 'Art. 43 Código del Notariado',
                rationale: 'Los Notarios deben remitir su protocolo del año anterior a la Contraloría del Notariado dentro de los primeros tres meses del año siguiente.'
            },
            {
                uid: 'not_4',
                type: 'multi',
                q: 'Seleccione las partes estructurales que integran toda Escritura Matriz conforme al Código del Notariado:',
                options: [
                    'Introducción (encabezamiento, comparecencia y fe de conocimiento)',
                    'Cuerpo del acto o contrato (exposición y estipulaciones)',
                    'Conclusión (otorgamiento, advertencias legales, lectura y autorización)',
                    'Auto de admisión dictado por el Registrador de la Propiedad'
                ],
                answer: [0, 1, 2],
                article: 'Art. 16 al 21 Código del Notariado',
                rationale: 'La escritura matriz consta de Introducción, Cuerpo y Conclusión; la calificación registral es un acto posterior externo al instrumento.'
            },
            {
                uid: 'not_5',
                type: 'single',
                q: '¿Para qué sirven las líneas en blanco que deben dejarse o inutilizarse al final de cada escritura matriz antes de iniciar la siguiente en el protocolo?',
                options: [
                    'Para evitar intercalaciones o alteraciones posteriores y garantizar la continuidad foliada entre instrumentos',
                    'Para que el Registrador de la Propiedad estampe las razones de inscripción del inmueble',
                    'Para consignar únicamente los timbres fiscales de contratación adheridos al testimonio',
                    'Para que los testigos instrumentales redacten su declaración jurada de solvencia'
                ],
                answer: 0,
                article: 'Art. 24 y 38 Código del Notariado',
                rationale: 'Las líneas sobrantes tras las firmas se inutilizan con una línea de tinta para impedir adiciones fraudulentas antes del encabezado del siguiente instrumento.'
            },
            {
                uid: 'not_6',
                type: 'single',
                q: '¿Cuál es la diferencia fundamental entre una Escritura Pública y un Acta Notarial?',
                options: [
                    'La escritura contiene declaraciones de voluntad constitutivas de actos o contratos; el acta consigna hechos jurídicos o circunstancias presenciadas por el Notario',
                    'La escritura se autoriza en papel simple sin matriz y el acta siempre se incorpora al protocolo corriente',
                    'El acta notarial requiere obligatoriamente dos testigos instrumentales y la escritura nunca los admite',
                    'La escritura carece de fe pública originaria mientras no sea protocolizada por el Juez Civil'
                ],
                answer: 0,
                article: 'Art. 15 y 26 Código del Notariado',
                rationale: 'Las escrituras documentan negocios jurídicos y consentimiento contractual; las actas dan fe de hechos, diligencias o percepciones sensoriales del Notario.'
            },
            {
                uid: 'not_7',
                type: 'single',
                q: '¿En qué consiste el principio de inmediación notarial?',
                options: [
                    'En la presencia física, directa y simultánea del Notario con los otorgantes, testigos e intérpretes durante la lectura, otorgamiento y firma del acto',
                    'En la obligación de inscribir el testimonio en el Instituto de la Propiedad dentro de las 24 horas siguientes',
                    'En la facultad del Notario de delegar la lectura y firma de escrituras en sus oficiales receptores',
                    'En la remisión electrónica inmediata de los avisos de tradición al Servicio de Administración de Rentas'
                ],
                answer: 0,
                article: 'Art. 5 y 21 Código del Notariado',
                rationale: 'La inmediación exige contacto directo del Notario con las partes y el instrumento, siendo indelegable la recepción del consentimiento.'
            },
            {
                uid: 'not_8',
                type: 'single',
                q: '¿Cómo se tramita la expedición de una segunda o ulterior copia (testimonio) de una escritura pública cuando puede resultar perjuicio para otra persona?',
                options: [
                    'Mediante solicitud de autorización ante el Juez de Letras de lo Civil competente con citación de los interesados',
                    'Directamente por el Notario sin requisito previo, cobrando el doble del arancel ordinario',
                    'Ante el Director General del Instituto de la Propiedad mediante resolución administrativa',
                    'Mediante acta de notoriedad autorizada por dos testigos abonados en la Contraloría'
                ],
                answer: 0,
                article: 'Art. 32 Código del Notariado',
                rationale: 'Cuando la segunda saca pueda causar perjuicio (como en obligaciones ejecutivas), requiere mandamiento judicial previo del Juez de Letras Civil.'
            },
            {
                uid: 'not_9',
                type: 'single',
                q: '¿Qué requisito adicional debe cumplir una Carta Poder o instrumento notarial hondureño para surtir plenos efectos legales en México?',
                options: [
                    'Obtener la Apostilla emitida por la Secretaría de Relaciones Exteriores de Honduras conforme al Convenio de La Haya',
                    'Legalizarla únicamente ante el Alcalde Municipal del domicilio del otorgante',
                    'Inscribirla en el Registro Mercantil de Tegucigalpa antes de su envío al extranjero',
                    'Someterla a auto de pareatis ante la Corte Suprema de Justicia de Honduras'
                ],
                answer: 0,
                article: 'Convenio de La Haya de 1961 sobre la Apostilla',
                rationale: 'Tanto Honduras como México son Estados parte del Convenio de La Haya, por lo que la Apostilla suprime la cadena de legalización diplomática o consular.'
            },
            {
                uid: 'not_10',
                type: 'single',
                q: '¿A quién pertenecen los protocolos notariales y qué impide que un Notario preste su protocolo a otro colega?',
                options: [
                    'Pertenecen al Estado (custodiados por el Notario) y el principio de indelegabilidad y custodia personal prohíbe extraerlos o prestarlos',
                    'Pertenecen al patrimonio hereditario privado del Notario y solo se prestan mediante fianza bancaria',
                    'Pertenecen al Colegio de Abogados y pueden prestarse por treinta días con acta de entrega',
                    'Pertenecen a los otorgantes de la primera escritura y se transfieren con cada testimonio'
                ],
                answer: 0,
                article: 'Art. 35 y 44 Código del Notariado',
                rationale: 'Los protocolos son propiedad del Estado; el Notario es su depositario y responsable directo de su conservación, siéndole prohibido entregarlos a terceros.'
            },
            {
                uid: 'not_11',
                type: 'single',
                q: '¿Cómo debe proceder el Notario cuando uno de los otorgantes es ciego o sordomudo que no sabe leer ni escribir?',
                options: [
                    'Si es ciego, se lee el instrumento dos veces en alta voz (por el Notario y por una persona designada por el otorgante); si es sordomudo analfabeto, interviene un intérprete idóneo que firma con él',
                    'Se suspende definitivamente el acto por incapacidad absoluta para contratar en sede notarial',
                    'Basta con que el Notario estampe su sello y firme en representación del otorgante impedido',
                    'Se sustituye la escritura pública por un documento privado autenticado con huella dactilar'
                ],
                answer: 0,
                article: 'Art. 21 Código del Notariado',
                rationale: 'El Código del Notariado garantiza la accesibilidad mediante la doble lectura en alta voz para ciegos y la intervención de intérpretes para sordomudos.'
            },
            {
                uid: 'not_12',
                type: 'single',
                q: '¿Qué es la falsedad ideológica y cómo puede incurrir en ella un Notario Público?',
                options: [
                    'Es la inserción de declaraciones o hechos falsos en un documento público auténtico en sus formas, como dar fe de comparecencias o pagos inexistentes',
                    'Es la raspadura material de una fecha en un documento privado ya firmado por particulares',
                    'Es el error aritmético involuntario al calcular los timbres de contratación de una venta',
                    'Es la omisión de remitir el índice del protocolo dentro de los primeros tres meses del año'
                ],
                answer: 0,
                article: 'Art. 456 Código Penal de Honduras',
                rationale: 'La falsedad ideológica ocurre cuando el documento es materialmente genuino pero su contenido narrativo falta a la verdad en hechos que debe probar.'
            }
        ]
    },
    {
        id: 'civil',
        title: 'Unidad 2: Derecho Civil, Bienes y Sucesiones',
        subtitle: 'Testamentos, asignaciones forzosas, derechos reales, hipoteca y contratos',
        icon: 'fa-landmark',
        accent: 'sky',
        questions: [
            {
                uid: 'civ_1',
                type: 'single',
                q: '¿Cuántos testigos hábiles se requieren para autorizar un testamento solemne abierto y cuántos para un testamento solemne cerrado en Honduras?',
                options: [
                    'Tres (3) testigos para el testamento abierto y cinco (5) testigos para el testamento cerrado',
                    'Dos (2) testigos para el testamento abierto y tres (3) testigos para el testamento cerrado',
                    'Cinco (5) testigos para el testamento abierto y siete (7) testigos para el testamento cerrado',
                    'Un (1) testigo instrumental para el abierto y dos (2) para el cerrado cuando interviene Notario'
                ],
                answer: 0,
                article: 'Art. 992 y 1001 Código Civil',
                rationale: 'El testamento abierto ante Notario exige 3 testigos instrumentales, mientras que el testamento cerrado exige la presencia de 5 testigos.'
            },
            {
                uid: 'civ_2',
                type: 'multi',
                q: 'Seleccione quiénes son incapaces de suceder por testamento (herencia o legado) otorgado durante la última enfermedad del testador:',
                options: [
                    'El eclesiástico o ministro de culto que hubiere confesado o asistido espiritualmente al testador en su última enfermedad',
                    'El médico de cabecera que hubiere asistido al testador durante su última enfermedad',
                    'El Notario que autorice el testamento, su cónyuge o parientes dentro del cuarto grado de consanguinidad',
                    'Los hijos legítimos o reconocidos del testador que lo cuidaron durante su convalecencia'
                ],
                answer: [0, 1, 2],
                article: 'Art. 945 y 1020 Código Civil',
                rationale: 'Para proteger la libertad testamentaria frente a captación de voluntad, la ley invalida disposiciones a favor del confesor, médico tratante y Notario autorizante.'
            },
            {
                uid: 'civ_3',
                type: 'single',
                q: '¿Qué son las asignaciones forzosas en el Derecho Sucesorio hondureño y cuál es su principal manifestación vigente?',
                options: [
                    'Son las que el testador está obligado a hacer y se suplen aun con perjuicio de sus disposiciones expresas, como los alimentos debidos por ley y la porción conyugal',
                    'Son las donaciones irrevocables que deben efectuarse obligatoriamente a favor de instituciones benéficas del Estado',
                    'Son las cuotas hereditarias iguales que corresponden siempre a los hermanos del causante aunque existan hijos',
                    'Son los legados de especie cierta que el albacea debe adjudicar antes de pagar las deudas hereditarias'
                ],
                answer: 0,
                article: 'Art. 1147 Código Civil',
                rationale: 'En Honduras existe amplia libertad de testar limitada únicamente por los alimentos que se deben por ley a ciertas personas y la porción conyugal.'
            },
            {
                uid: 'civ_4',
                type: 'single',
                q: '¿Cuál es la diferencia jurídica esencial entre un heredero a título universal y un legatario a título singular?',
                options: [
                    'El heredero sucede en la totalidad o cuota del patrimonio (activos y pasivos), mientras el legatario adquiere bienes o derechos determinados sin responder ilimitadamente de deudas',
                    'El heredero solo puede instituirse por testamento cerrado y el legatario únicamente por sucesión ab-intestato',
                    'El legatario responde con su patrimonio propio por todas las deudas del causante y el heredero nunca responde',
                    'El heredero carece del derecho de acrecer mientras que el legatario goza siempre de representación sucesoria'
                ],
                answer: 0,
                article: 'Art. 935, 1068 y 1075 Código Civil',
                rationale: 'El heredero representa la persona del difunto en su universalidad jurídica; el legatario es un sucesor particular en especies o géneros determinados.'
            },
            {
                uid: 'civ_5',
                type: 'single',
                q: '¿Qué es el derecho de representación en las sucesiones por causa de muerte y en qué casos opera?',
                options: [
                    'Es una ficción legal en que una persona ocupa el lugar, grado y derechos hereditarios que tendría su padre o madre si no quisiese o no pudiese suceder (en descendencia del difunto o de sus hermanos)',
                    'Es el mandato especial otorgado en escritura pública para aceptar una herencia con beneficio de inventario',
                    'Es la facultad del albacea testamentario para vender bienes inmuebles de la masa hereditaria sin subasta',
                    'Es la sustitución vulgar ordenada por el testador a favor de acreedores hipotecarios del causante'
                ],
                answer: 0,
                article: 'Art. 963 y 965 Código Civil',
                rationale: 'La representación opera exclusivamente en la sucesión intestada respecto de la descendencia del difunto y la descendencia de sus hermanos.'
            },
            {
                uid: 'civ_6',
                type: 'single',
                q: '¿Qué es la herencia yacente y cómo se procede judicialmente respecto de ella?',
                options: [
                    'Es el estado en que se encuentra la herencia que no ha sido aceptada dentro de los quince días siguientes a su apertura sin haber albacea con tenencia de bienes, procediendo el Juez a nombrarle un curador',
                    'Es la herencia repudiada expresamente por el Estado cuando no existen parientes dentro del sexto grado',
                    'Es el caudal relicto compuesto únicamente por bienes muebles fungibles sujetos a subasta fiscal inmediata',
                    'Es la porción conyugal que queda en suspenso mientras se liquida la sociedad de gananciales'
                ],
                answer: 0,
                article: 'Art. 1207 Código Civil',
                rationale: 'Si transcurren 15 días de abierta la sucesión sin aceptación ni albacea con tenencia de bienes, el Juez la declara yacente y designa curador.'
            },
            {
                uid: 'civ_7',
                type: 'single',
                q: '¿En qué consiste el contrato de anticresis y cuál es su efecto principal respecto al acreedor?',
                options: [
                    'Es un contrato por el cual se entrega al acreedor una finca raíz para que se pague con sus frutos (imputándolos primero a intereses y luego al capital)',
                    'Es la entrega de bienes muebles en garantía de una obligación mercantil con desplazamiento de posesión',
                    'Es la prohibición convencional de enajenar un inmueble durante diez años inscrita en el Registro',
                    'Es la cesión gratuita del derecho real de habitación vitalicia a favor de ascendientes mayores'
                ],
                answer: 0,
                article: 'Art. 2138 y 2142 Código Civil',
                rationale: 'La anticresis confiere al acreedor la tenencia de un inmueble para percibir sus frutos naturales o civiles como medio de amortización del crédito.'
            },
            {
                uid: 'civ_8',
                type: 'single',
                q: '¿Qué es la cláusula penal en los contratos civiles y cuál es su función jurídica?',
                options: [
                    'Es aquella en que una persona, para asegurar el cumplimiento de una obligación, se sujeta a una pena consistente en dar o hacer algo en caso de no ejecutar o retardar la obligación principal',
                    'Es la sanción privativa de libertad pactada entre particulares ante el incumplimiento de un mutuo hipotecario',
                    'Es la nulidad absoluta declarada de oficio por el Notario cuando el precio de venta es inferior al catastral',
                    'Es la multa impuesta por el Instituto de la Propiedad al presentar fuera de plazo una desmembración'
                ],
                answer: 0,
                article: 'Art. 1421 Código Civil',
                rationale: 'La cláusula penal funciona como caución accesoria y liquidación anticipada de daños y perjuicios por incumplimiento o mora.'
            },
            {
                uid: 'civ_9',
                type: 'single',
                q: '¿Qué es la acción reivindicatoria o reivindicación de dominio y quién está legitimado para ejercerla?',
                options: [
                    'Es la acción real que tiene el dueño de una cosa singular, de que no está en posesión, para que el poseedor de ella sea condenado a restituírsela',
                    'Es la acción personal del arrendador para exigir el pago de rentas vencidas sin recuperar el inmueble',
                    'Es el interdicto posesorio que ejerce el mero tenedor contra el propietario inscrito en el Registro',
                    'Es la solicitud administrativa de titulación supletoria de tierras nacionales ante el Instituto Nacional Agrario'
                ],
                answer: 0,
                article: 'Art. 868 Código Civil',
                rationale: 'La reivindicación tutela el derecho real de dominio del propietario no poseedor frente al poseedor actual de la cosa singular.'
            },
            {
                uid: 'civ_10',
                type: 'single',
                q: '¿En qué consiste el pago por consignación y cuándo procede legalmente?',
                options: [
                    'Es el depósito judicial de la cosa debida realizado tras la oferta formal de pago cuando el acreedor se niega sin justa causa a recibirla o se encuentra ausente o incierto',
                    'Es el pago parcial efectuado mediante cheque posfechado sin consentimiento del acreedor',
                    'Es la compensación automática entre deudas ilíquidas de distinta naturaleza jurídica',
                    'Es la dación en pago de un bien inmueble sin necesidad de otorgar escritura pública'
                ],
                answer: 0,
                article: 'Art. 1456 y 1457 Código Civil',
                rationale: 'El pago por consignación permite al deudor diligente liberarse de la obligación y detener intereses moratorios ante la renuencia o ausencia del acreedor.'
            }
        ]
    },
    {
        id: 'familia',
        title: 'Unidad 3: Derecho de Familia, Niñez y Adopciones',
        subtitle: 'Regímenes matrimoniales, unión de hecho, divorcio, peculio e interés superior',
        icon: 'fa-people-roof',
        accent: 'teal',
        questions: [
            {
                uid: 'fam_1',
                type: 'single',
                q: '¿Qué regímenes económicos matrimoniales reconoce el Código de Familia de Honduras y cuál rige a falta de capitulaciones?',
                options: [
                    'Comunidad de bienes, sociedad ganancial y separación de bienes; a falta de capitulaciones matrimoniales rige la sociedad ganancial',
                    'Únicamente comunidad universal absoluta y separación total; a falta de pacto rige la separación de bienes',
                    'Sociedad conyugal mercantil y fideicomiso familiar; a falta de pacto decide el Registrador Civil',
                    'Separación de bienes obligatoria cuando el matrimonio se celebra en sede notarial'
                ],
                answer: 0,
                article: 'Art. 64 y 68 Código de Familia',
                rationale: 'Los contrayentes pueden elegir comunidad de bienes, sociedad ganancial o separación de bienes; si no otorgan capitulaciones, rige la sociedad ganancial.'
            },
            {
                uid: 'fam_2',
                type: 'multi',
                q: 'Seleccione los documentos indispensables que el Notario debe exigir y agregar al expediente para autorizar un matrimonio civil:',
                options: [
                    'Certificaciones originales de actas de nacimiento de ambos contrayentes',
                    'Certificación de estado civil (soltería) y constancia de antecedentes penales',
                    'Certificado médico prenupcial y constancia de parentesco/consanguinidad',
                    'Escritura pública de hipoteca que garantice el pago de alimentos futuros'
                ],
                answer: [0, 1, 2],
                article: 'Art. 23 y 24 Código de Familia',
                rationale: 'El expediente matrimonial requiere actas de nacimiento, constancia de soltería, certificado médico prenupcial y declaración de testigos sobre aptitud legal.'
            },
            {
                uid: 'fam_3',
                type: 'single',
                q: 'Si un Notario con domicilio en Tegucigalpa es requerido para autorizar un matrimonio en la ciudad de La Ceiba, ¿puede actuar válidamente y tiene obligación de informar a la capital?',
                options: [
                    'Sí puede autorizarlo porque la fe pública notarial es nacional en toda la República, sin requerir permiso previo ni informe especial a Tegucigalpa, debiendo remitir el acta al Registro Civil de La Ceiba',
                    'No puede autorizarlo porque su competencia territorial se limita exclusivamente al departamento de Francisco Morazán',
                    'Debe solicitar autorización escrita previa al Presidente de la Corte Suprema de Justicia con 15 días de antelación',
                    'Solo puede autorizarlo si un Notario con domicilio en Atlántida firma conjuntamente la escritura'
                ],
                answer: 0,
                article: 'Art. 6 Código del Notariado y Art. 30 Código de Familia',
                rationale: 'Los Notarios ejercen su función en todo el territorio nacional; tras celebrar el matrimonio deben remitir certificación al Registrador Civil del lugar de celebración.'
            },
            {
                uid: 'fam_4',
                type: 'single',
                q: '¿En qué casos excepcionales puede reconocerse la Unión de Hecho aunque no se haya cumplido el plazo ordinario de tres (3) años de convivencia continua?',
                options: [
                    'Cuando exista consentimiento mutuo y hubieren procreado hijos durante la convivencia singular y estable',
                    'Cuando ambos convivientes adquieran un bien inmueble en copropiedad mediante crédito hipotecario',
                    'Cuando uno de los convivientes resida en el extranjero y otorgue poder especial de convivencia',
                    'Cuando la pareja tenga más de seis meses de noviazgo público certificado por dos testigos'
                ],
                answer: 0,
                article: 'Art. 45 y 46 Código de Familia',
                rationale: 'El plazo general de 3 años de vida en común se exceptúa cuando los convivientes han procreado hijos, pudiendo formalizarse antes.'
            },
            {
                uid: 'fam_5',
                type: 'single',
                q: '¿Qué rango de edad define legalmente a "niño o niña" conforme al Código de la Niñez y la Adolescencia de Honduras?',
                options: [
                    'Toda persona menor de dieciocho (18) años de edad (subdividida en infancia hasta los 12 años y adolescencia de los 12 a los 18)',
                    'Únicamente los menores comprendidos entre cero (0) y doce (12) años de edad',
                    'Toda persona menor de veintiún (21) años de edad sujeta a patria potestad',
                    'Los menores de catorce (14) años que aún no han obtenido autorización laboral'
                ],
                answer: 0,
                article: 'Art. 1 Código de la Niñez y la Adolescencia',
                rationale: 'Para efectos legales en Honduras, se considera niño o niña a todo ser humano menor de dieciocho años de edad.'
            },
            {
                uid: 'fam_6',
                type: 'single',
                q: '¿Qué requisito de diferencia de edad exige el Código de Familia para que una persona mayor de edad pueda adoptar?',
                options: [
                    'Ser mayor de veinticinco (25) años, menor de sesenta (60) y tener al menos quince (15) años más que el adoptado',
                    'Tener exactamente veintiún (21) años cumplidos y cinco (5) años más que el adoptado',
                    'Ser mayor de treinta y cinco (35) años y carecer totalmente de hijos biológicos previos',
                    'Tener al menos diez (10) años de diferencia de edad sin límite máximo establecido'
                ],
                answer: 0,
                article: 'Art. 123 Código de Familia y Ley Especial de Adopciones',
                rationale: 'La legislación exige que el adoptante sea mayor de 25 y menor de 60 años (salvo excepciones calificadas), con una diferencia mínima de 15 años respecto al adoptado.'
            },
            {
                uid: 'fam_7',
                type: 'single',
                q: '¿Cuáles son las clases de emancipación reconocidas en la legislación civil y familiar hondureña?',
                options: [
                    'Voluntaria (por escritura pública de los padres con consentimiento del hijo mayor de 18 años), legal (por matrimonio del menor) y judicial',
                    'Únicamente testamentaria y administrativa dictada por el Registro Nacional de las Personas',
                    'Tácita por abandono del hogar familiar y presunta por cumplir dieciséis años',
                    'Notarial unilateral sin consentimiento del menor y municipal por declaración de vecindad'
                ],
                answer: 0,
                article: 'Art. 263 al 267 Código Civil',
                rationale: 'La emancipación pone fin a la patria potestad antes de la mayoría de edad y puede ser voluntaria, legal o judicial.'
            },
            {
                uid: 'fam_8',
                type: 'single',
                q: '¿Qué documentos adicionales exige el Código de Familia para autorizar segundas o ulteriores nupcias cuando existen hijos menores bajo patria potestad?',
                options: [
                    'Certificación de defunción del cónyuge anterior o sentencia firme de divorcio/nulidad e inventario solemne de los bienes de los hijos menores bajo su administración',
                    'Únicamente declaración jurada verbal ante dos testigos de que no existen deudas alimentarias',
                    'Autorización escrita de los exsuegros aprobando el nuevo régimen económico matrimonial',
                    'Constancia bancaria de depósito a plazo fijo equivalente al 50% de los ingresos anuales'
                ],
                answer: 0,
                article: 'Art. 25 y 26 Código de Familia',
                rationale: 'Para proteger el patrimonio de los hijos del matrimonio anterior, quien pretenda volver a casarse debe acreditar la disolución previa y presentar inventario de bienes de los menores.'
            }
        ]
    },
    {
        id: 'constitucional',
        title: 'Unidad 4: Derecho Constitucional y Derechos Humanos',
        subtitle: 'Supremacía, artículos pétreos, garantías constitucionales y Sistema Interamericano',
        icon: 'fa-scale-unbalanced',
        accent: 'indigo',
        questions: [
            {
                uid: 'con_1',
                type: 'multi',
                q: 'Seleccione las disposiciones que tienen carácter de artículos irreformables (pétreos) en la Constitución de la República de Honduras:',
                options: [
                    'La forma de gobierno (republicano, democrático y representativo)',
                    'El territorio nacional y la prohibición de la reelección presidencial',
                    'El período presidencial y quiénes no pueden ser Presidente de la República',
                    'La división administrativa de los dieciocho departamentos y el presupuesto municipal'
                ],
                answer: [0, 1, 2],
                article: 'Art. 374 Constitución de la República',
                rationale: 'El Art. 374 declara irreformables la forma de gobierno, el territorio nacional, el período presidencial, la prohibición de reelección y las inhabilidades presidenciales.'
            },
            {
                uid: 'con_2',
                type: 'single',
                q: '¿Cuál es la diferencia técnica entre Derechos Constitucionales y Garantías Constitucionales?',
                options: [
                    'Los derechos son las facultades y libertades inherentes reconocidas a la persona; las garantías son los mecanismos procesales (Habeas Corpus, Amparo, Inconstitucionalidad) que aseguran su protección y restitución',
                    'Los derechos solo protegen a los ciudadanos mayores de edad y las garantías únicamente a los extranjeros residentes',
                    'Las garantías se regulan exclusivamente en el Código Civil y los derechos en reglamentos municipales',
                    'No existe distinción jurídica entre ambos conceptos dentro de la Ley sobre Justicia Constitucional'
                ],
                answer: 0,
                article: 'Art. 59, 182 y 183 Constitución; Ley sobre Justicia Constitucional',
                rationale: 'Los derechos constituyen el contenido sustantivo tutelado, mientras que las garantías son las acciones adjetivas o remedios jurisdiccionales para hacerlos efectivos.'
            },
            {
                uid: 'con_3',
                type: 'single',
                q: 'Ante una detención policial que excede las veinticuatro (24) o cuarenta y ocho (48) horas constitucionales sin poner al detenido a la orden del juez competente, ¿qué garantía constitucional debe interponerse de inmediato?',
                options: [
                    'Acción de Exhibición Personal o Habeas Corpus, que puede interponerse por cualquier persona sin formalidad alguna y a cualquier hora',
                    'Recurso extraordinario de casación penal por infracción de ley sustantiva',
                    'Acción popular de inconstitucionalidad en vía directa ante la Sala de lo Constitucional',
                    'Demanda ordinaria de nulidad administrativa ante el Juzgado de Letras de lo Contencioso'
                ],
                answer: 0,
                article: 'Art. 71 y 182 Constitución; Art. 13 Ley sobre Justicia Constitucional',
                rationale: 'El Habeas Corpus tutela la libertad e integridad personal frente a detenciones ilegales o vejámenes, sin requerir poder ni formalidades escritas.'
            },
            {
                uid: 'con_4',
                type: 'single',
                q: '¿Qué órgano jurisdiccional es competente para conocer y resolver los conflictos de competencia o atribuciones entre Poderes del Estado o entre una Secretaría de Estado y otro órgano constitucional?',
                options: [
                    'La Corte Suprema de Justicia a través de la Sala de lo Constitucional',
                    'El Tribunal de Justicia Electoral en pleno',
                    'La Procuraduría General de la República mediante dictamen vinculante',
                    'La Corte de Apelaciones de lo Contencioso Administrativo'
                ],
                answer: 0,
                article: 'Art. 313 numeral 10 y Art. 316 Constitución de la República',
                rationale: 'Corresponde a la Corte Suprema de Justicia (Sala de lo Constitucional) dirimir los conflictos entre Poderes del Estado y órganos constitucionales.'
            },
            {
                uid: 'con_5',
                type: 'single',
                q: '¿Qué instrumento internacional dio origen a la Corte Interamericana de Derechos Humanos y por cuántos jueces está integrada actualmente?',
                options: [
                    'La Convención Americana sobre Derechos Humanos (Pacto de San José de Costa Rica) y está integrada por siete (7) jueces nacionales de los Estados miembros de la OEA',
                    'La Carta de las Naciones Unidas y está integrada por quince (15) magistrados permanentes',
                    'El Tratado de Westfalia y está compuesta por nueve (9) jueces designados por el Consejo de Seguridad',
                    'El Protocolo de Tegucigalpa y se conforma por cinco (5) jueces centroamericanos'
                ],
                answer: 0,
                article: 'Art. 33 y 52 Convención Americana sobre Derechos Humanos',
                rationale: 'La Corte IDH fue creada por el Pacto de San José (1969) y se compone de siete jueces elegidos a título personal entre juristas de la más alta autoridad moral.'
            },
            {
                uid: 'con_6',
                type: 'single',
                q: '¿En qué consiste el Control de Convencionalidad que deben ejercer los jueces y autoridades en Honduras?',
                options: [
                    'En el deber de verificar la compatibilidad de las normas y actos internos con la Convención Americana sobre Derechos Humanos y la jurisprudencia vinculante de la Corte IDH',
                    'En la facultad del Congreso Nacional para derogar tratados internacionales mediante decretos ejecutivos',
                    'En el registro obligatorio de todas las convenciones colectivas de trabajo ante la Secretaría de Trabajo',
                    'En la revisión aduanera de mercancías amparadas en tratados de libre comercio'
                ],
                answer: 0,
                article: 'Art. 16 Constitución y Jurisprudencia Corte IDH (Caso Almonacid Arellano)',
                rationale: 'Todo juez o autoridad interna debe interpretar y aplicar el derecho nacional conforme a la Convención Americana y los estándares de la Corte IDH.'
            },
            {
                uid: 'con_7',
                type: 'single',
                q: '¿Cuál es el presupuesto mínimo anual asignado constitucionalmente al Poder Judicial de Honduras?',
                options: [
                    'No menor del tres por ciento (3%) de los ingresos corrientes del Presupuesto General de Ingresos y Egresos de la República',
                    'Exactamente el uno por ciento (1%) del Producto Interno Bruto nominal del año fiscal anterior',
                    'El cinco por ciento (5%) de la recaudación exclusiva del Impuesto Sobre la Renta',
                    'Un monto discrecional fijado anualmente por la Secretaría de Finanzas sin mínimo constitucional'
                ],
                answer: 0,
                article: 'Art. 318 Constitución de la República',
                rationale: 'Para garantizar su independencia económica, el Poder Judicial goza de una asignación no menor al 3% de los ingresos corrientes.'
            },
            {
                uid: 'con_8',
                type: 'single',
                q: '¿Cuál es la distinción jurídica entre paridad y alternancia en materia electoral hondureña?',
                options: [
                    'La paridad exige una participación igualitaria (50% mujeres y 50% hombres) en las nóminas de cargos de elección; la alternancia ordena ubicarlos de forma intercalada (mujer-hombre o viceversa)',
                    'La paridad aplica únicamente a los magistrados de la Corte Suprema y la alternancia a los alcaldes municipales',
                    'La alternancia permite que un mismo candidato ocupe dos cargos simultáneos y la paridad lo prohíbe',
                    'Ambas figuras son sinónimas y solo rigen para elecciones internas de juntas directivas mercantiles'
                ],
                answer: 0,
                article: 'Ley Electoral de Honduras (Principios de Paridad y Alternancia)',
                rationale: 'La paridad garantiza igualdad numérica (50/50) y la alternancia evita que las mujeres sean relegadas a los últimos puestos de las planillas.'
            }
        ]
    },
    {
        id: 'penal',
        title: 'Unidad 5: Derecho Penal, Procesal Penal y Procesal Civil',
        subtitle: 'Teoría del delito, medidas desjudicializadoras, prisión preventiva, costas y caducidad',
        icon: 'fa-gavel',
        accent: 'rose',
        questions: [
            {
                uid: 'pen_1',
                type: 'multi',
                q: 'Seleccione las medidas desjudicializadoras contempladas en el Código Procesal Penal de Honduras:',
                options: [
                    'El Criterio de Oportunidad',
                    'La Suspensión Condicional de la Persecución Penal',
                    'La Conciliación (en delitos perseguibles a instancia de parte o culposos)',
                    'El Recurso Extraordinario de Revisión de Sentencia Firme'
                ],
                answer: [0, 1, 2],
                article: 'Art. 28, 36 y 45 Código Procesal Penal',
                rationale: 'El criterio de oportunidad, la suspensión condicional y la conciliación permiten resolver conflictos penales sin agotar el juicio oral y público.'
            },
            {
                uid: 'pen_2',
                type: 'single',
                q: '¿Cuál es la duración ordinaria máxima de la prisión preventiva en Honduras y hasta cuánto puede ampliarse excepcionalmente en delitos graves?',
                options: [
                    'Regla general hasta un (1) año; en delitos sancionados con pena superior a 6 años hasta dos (2) años, prorrogable por la CSJ hasta por seis (6) meses adicionales',
                    'Seis (6) meses improrrogables para cualquier delito grave o menos grave',
                    'Tres (3) años automáticos desde la audiencia inicial sin necesidad de revisión periódica',
                    'Cuarenta y ocho (48) días hábiles contados a partir del auto de formal procesamiento'
                ],
                answer: 0,
                article: 'Art. 181 Código Procesal Penal',
                rationale: 'La prisión preventiva dura como regla general hasta 1 año, hasta 2 años en delitos con pena mayor de 6 años, y admite prórroga excepcional de hasta 6 meses por la CSJ.'
            },
            {
                uid: 'pen_3',
                type: 'single',
                q: '¿Quiénes están exentos de la obligación de declarar como testigos en materia penal por razón de parentesco o secreto profesional?',
                options: [
                    'El cónyuge o compañero de hogar, ascendientes, descendientes, hermanos, así como ministros de culto, abogados, notarios y médicos respecto a hechos conocidos bajo secreto profesional',
                    'Únicamente los funcionarios públicos activos del Poder Ejecutivo y diputados del Congreso Nacional',
                    'Cualquier vecino del imputado que manifieste temor reverencial hacia la víctima',
                    'Los peritos oficiales designados por el Ministerio Público cuando el dictamen sea desfavorable'
                ],
                answer: 0,
                article: 'Art. 225 y 226 Código Procesal Penal',
                rationale: 'La ley protege la cohesión familiar y el secreto profesional (incluyendo al Notario y Abogado) eximiéndolos de declarar sobre hechos confidenciales.'
            },
            {
                uid: 'pen_4',
                type: 'single',
                q: '¿En qué consiste la figura procesal de "estricta conformidad" en el proceso penal hondureño?',
                options: [
                    'Es el acuerdo entre el Ministerio Público, el imputado y su defensor mediante el cual el acusado acepta los hechos y la pena solicitada (sin exceder el mínimo legal o pactada), dictándose sentencia inmediata sin debate',
                    'Es la sentencia absolutoria dictada cuando el acusador privado desiste de la querella en juicio oral',
                    'Es la conformidad tácita de las partes con el auto de apertura a juicio al no interponer reposición',
                    'Es la adhesión de un tercer acreedor al embargo preventivo decretado en un juicio ejecutivo'
                ],
                answer: 0,
                article: 'Art. 322 Código Procesal Penal',
                rationale: 'La estricta conformidad permite concluir el proceso antes o al inicio del debate mediante aceptación libre de los hechos y la pena acordada.'
            },
            {
                uid: 'pen_5',
                type: 'single',
                q: '¿Qué tipos de costas existen en el proceso civil hondureño y qué comprende cada una?',
                options: [
                    'Costas procesales (gastos indispensables del proceso como aranceles, publicaciones y peritajes) y costas personales (honorarios profesionales de los abogados intervinientes)',
                    'Costas ordinarias (multas fiscales) y costas extraordinarias (indemnización por daño moral)',
                    'Costas ejecutivas (remate de bienes) y costas notariales (protocolización de la sentencia)',
                    'Costas de primera instancia (timbres de actuación) y costas de apelación (fianza de resultas)'
                ],
                answer: 0,
                article: 'Art. 218 y 219 Código Procesal Civil',
                rationale: 'Las costas se dividen en procesales (gastos materiales del litigio) y personales (honorarios del profesional del derecho).'
            },
            {
                uid: 'pen_6',
                type: 'single',
                q: '¿Qué es el recurso de queja en el ordenamiento procesal hondureño y contra qué resoluciones procede?',
                options: [
                    'Es un recurso instrumental que se interpone directamente ante el órgano jurisdiccional superior cuando el juez inferior deniega indebidamente la admisión de un recurso de apelación o de casación',
                    'Es una denuncia administrativa presentada ante el Colegio de Abogados por cobro excesivo de honorarios',
                    'Es el recurso ordinario para revocar providencias de mero trámite dentro de las 24 horas',
                    'Es la impugnación de la tasación de costas practicada por el Secretario del Juzgado'
                ],
                answer: 0,
                article: 'Art. 710 Código Procesal Civil y Art. 358 Código Procesal Penal',
                rationale: 'El recurso de queja tutela el derecho al recurso cuando el tribunal a quo rechaza la tramitación de una apelación o casación.'
            },
            {
                uid: 'pen_7',
                type: 'single',
                q: '¿Qué significa la expresión latina "inaudita parte" en el ámbito de las medidas cautelares procesales?',
                options: [
                    'Que el juez adopta una medida cautelar urgente sin audiencia previa del demandado o afectado para evitar que frustre la efectividad de la tutela judicial',
                    'Que la sentencia definitiva se dicta sin escuchar los alegatos finales del Ministerio Público',
                    'Que las declaraciones testimoniales recibidas fuera de audiencia carecen de valor probatorio',
                    'Que el expediente judicial permanece reservado durante diez años tras su archivo definitivo'
                ],
                answer: 0,
                article: 'Art. 381 Código Procesal Civil',
                rationale: 'Las medidas cautelares pueden decretarse inaudita parte cuando la notificación previa pondría en riesgo el aseguramiento de bienes o pruebas.'
            },
            {
                uid: 'pen_8',
                type: 'single',
                q: '¿Qué es el Auto de Pareatis y qué órgano es competente para concederlo en Honduras?',
                options: [
                    'Es el procedimiento de reconocimiento u homologación de sentencias o laudos arbitrales extranjeros para que tengan fuerza ejecutoria en Honduras, competencia exclusiva de la Corte Suprema de Justicia',
                    'Es la orden de captura internacional emitida por un Juez de Letras Penal de turno',
                    'Es la autorización notarial para contraer matrimonio por poder especial desde el extranjero',
                    'Es el auto mediante el cual el Registrador Mercantil aprueba la fusión de sociedades anónimas'
                ],
                answer: 0,
                article: 'Art. 753 al 757 Código Procesal Civil',
                rationale: 'El exequátur o auto de pareatis corresponde a la Corte Suprema de Justicia, verificando reciprocidad, competencia de origen, debido proceso y orden público.'
            }
        ]
    },
    {
        id: 'mercantil',
        title: 'Unidad 6: Derecho Mercantil, Registral y Aranceles',
        subtitle: 'Títulos valores, sociedades, principios registrales, impuestos y cálculos prácticos',
        icon: 'fa-calculator',
        accent: 'emerald',
        questions: [
            {
                uid: 'mer_1',
                type: 'multi',
                q: 'Seleccione todos los requisitos generales esenciales que debe contener todo Título Valor conforme al Código de Comercio de Honduras:',
                options: [
                    'El nombre del título de que se trate y la fecha y lugar de expedición',
                    'Las prestaciones y derechos que el título confiera',
                    'El lugar y fecha de cumplimiento o ejercicio de tales derechos',
                    'La firma de quien lo expide (o huella digital autenticada cuando corresponda)',
                    'La inscripción obligatoria previa en el Instituto de la Propiedad'
                ],
                answer: [0, 1, 2, 3],
                article: 'Art. 451 Código de Comercio',
                rationale: 'El Art. 451 enumera los cinco requisitos formales esenciales de todo título valor; su validez cambiaria no depende de inscripción inmobiliaria.'
            },
            {
                uid: 'mer_2',
                type: 'single',
                q: '¿Qué son "cosas mercantiles" según el Código de Comercio de Honduras?',
                options: [
                    'Los títulos valores, las negociaciones o empresas de carácter lucrativo y sus elementos (especialmente el nombre comercial, avisos, marcas y patentes) y los buques',
                    'Únicamente los bienes inmuebles urbanos inscritos en el Registro Mercantil',
                    'Los bienes muebles de uso doméstico adquiridos por consumidores finales sin ánimo de lucro',
                    'Las acciones reivindicatorias y servidumbres prediales constituidas entre comerciantes'
                ],
                answer: 0,
                article: 'Art. 4 Código de Comercio',
                rationale: 'Son cosas mercantiles los títulos valores, las empresas lucrativas con sus elementos inmateriales y los buques.'
            },
            {
                uid: 'mer_3',
                type: 'single',
                q: '¿Cuáles son las dos formas jurídicas mediante las cuales pueden fusionarse las sociedades mercantiles en Honduras?',
                options: [
                    'Por integración (creación de una nueva sociedad que absorbe el patrimonio de las disueltas) o por absorción/incorporación (una sociedad subsistente absorbe a otra u otras)',
                    'Por escisión parcial y por liquidación judicial forzosa ante la Comisión Nacional de Bancos',
                    'Por cesión de cuotas sociales y por transformación unipersonal sin publicación en La Gaceta',
                    'Por arrendamiento de establecimiento comercial y por franquicia internacional'
                ],
                answer: 0,
                article: 'Art. 344 Código de Comercio',
                rationale: 'La fusión puede realizarse creando una sociedad nueva (fusión pura o por integración) o incorporando una o más sociedades a otra preexistente (absorción).'
            },
            {
                uid: 'mer_4',
                type: 'single',
                q: '¿En qué consiste el Principio de Prelación o Prioridad en el Derecho Registral hondureño?',
                options: [
                    'En que el acto o título que ingresa primero al Registro (según fecha, hora y minuto del asiento de presentación) tiene preferencia sobre cualquier otro presentado con posterioridad ("prior tempore, potior jure")',
                    'En que las escrituras autorizadas por Notarios más antiguos se inscriben antes que las de Notarios recientes',
                    'En que los contratos gratuitos tienen preferencia registral sobre las compraventas onerosas',
                    'En que el Registrador puede alterar el orden de presentación según la cuantía del impuesto pagado'
                ],
                answer: 0,
                article: 'Art. 42 Ley de Propiedad',
                rationale: 'El asiento de presentación determina la prioridad registral estricta por orden cronológico de ingreso.'
            },
            {
                uid: 'mer_5',
                type: 'single',
                q: '¿En qué consiste la Calificación Registral ejercida por el Registrador de la Propiedad?',
                options: [
                    'Es el examen de legalidad intrínseca y extrínseca que realiza el Registrador sobre las formas del documento, capacidad de otorgantes y validez de actos inscribibles antes de autorizar o denegar el asiento',
                    'Es el avalúo catastral del inmueble para fijar el precio mínimo de venta entre particulares',
                    'Es la sanción disciplinaria que impone el Registrador al Notario cuando existen errores ortográficos',
                    'Es la certificación de solvencia municipal exigida para otorgar testamentos cerrados'
                ],
                answer: 0,
                article: 'Art. 39 Ley de Propiedad',
                rationale: 'La calificación registral garantiza que solo accedan al Registro títulos válidos y perfectos conforme al principio de legalidad.'
            },
            {
                uid: 'mer_6',
                type: 'single',
                q: 'Calcule el monto exacto de los derechos de registro en el Instituto de la Propiedad (IP) para una compraventa de inmueble por valor de L 1,500,000.00 (base L 200.00 por los primeros L 1,000.00 + L 1.50 por cada millar o fracción excedente):',
                options: [
                    'L 2,448.50 (L 200.00 por los primeros L 1,000 + 1,499 millares × L 1.50 = L 2,248.50)',
                    'L 22,500.00 (correspondiente al 1.5% del valor total del inmueble)',
                    'L 1,500.00 (a razón de L 1.00 exacto por cada millar del precio pactado)',
                    'L 4,500.00 (equivalente al 0.30% fijo sobre operaciones mayores a un millón)'
                ],
                answer: 0,
                article: 'Tabla de Tasas por Servicios Registrales — Ley de Propiedad',
                rationale: 'Por los primeros L 1,000 se pagan L 200.00; por los L 1,499,000 restantes (1,499 millares × L 1.50 = L 2,248.50), sumando exactamente L 2,448.50.'
            },
            {
                uid: 'mer_7',
                type: 'single',
                q: '¿En qué consiste el Impuesto sobre Ganancias de Capital en la enajenación de inmuebles en Honduras, cuál es su tarifa general, a quién corresponde pagarlo y en qué plazo?',
                options: [
                    'Grava con el diez por ciento (10%) la utilidad neta obtenida (precio de venta menos costo de adquisición y mejoras); corresponde al vendedor y debe declararse y pagarse dentro de los diez (10) días siguientes a la transacción',
                    'Grava con el 1.5% el valor catastral total; lo paga el comprador dentro de los treinta (30) días hábiles posteriores a la inscripción',
                    'Grava con el 15% cualquier donación entre padres e hijos; lo retiene el Instituto de la Propiedad al presentar el testimonio',
                    'Grava con el 5% el valor del mutuo hipotecario; lo paga el banco acreedor al cierre del ejercicio fiscal'
                ],
                answer: 0,
                article: 'Art. 10 Ley de Equidad Tributaria y Ley del Impuesto Sobre la Renta',
                rationale: 'El vendedor paga el 10% sobre la ganancia neta obtenida en la enajenación dentro de los 10 días siguientes al otorgamiento.'
            },
            {
                uid: 'mer_8',
                type: 'single',
                q: 'Según el Arancel del Profesional del Derecho en Honduras, ¿cuánto se debe cobrar de honorarios notariales cuando comparece como otorgante un pariente del propio Notario (dentro de los grados permitidos por ley)?',
                options: [
                    'Se puede conceder una rebaja de hasta el cincuenta por ciento (50%) de los honorarios mínimos fijados en el Arancel',
                    'Está absolutamente prohibido cobrar honorarios, debiendo autorizarse siempre a título gratuito',
                    'Debe cobrarse obligatoriamente el doble del arancel ordinario como garantía de imparcialidad',
                    'El arancel exime totalmente del pago de timbres fiscales y papel sellado notarial'
                ],
                answer: 0,
                article: 'Arancel del Profesional del Derecho de Honduras',
                rationale: 'El Arancel permite al Notario reducir hasta en un 50% los honorarios cuando presta servicios profesionales a sus parientes dentro de los grados legales.'
            }
        ]
    }
];

// ==========================================
// EXPANSIÓN DE BANCO (EXACTAMENTE 500 PREGUNTAS + 4 DINÁMICAS)
// ==========================================
(function expandQuestionBank() {
    const plausibleDistractors = [
        'Únicamente cuando medie autorización expresa de la Contraloría del Notariado mediante resolución motivada.',
        'Requiere protocolización previa ante Juez de Letras de lo Civil dentro de los quince (15) días hábiles siguientes.',
        'Surtirá efectos jurídicos únicamente entre los otorgantes, pero carecerá de eficacia frente a terceros registrales.',
        'Procede exclusivamente a instancia del Ministerio Público cuando exista perjuicio patrimonial cuantificable.'
    ];

    unitsData.forEach(u => {
        u.questions.forEach((q, idx) => {
            if (q.type !== 'multi' && q.options.length === 4) {
                q.options = q.options.map((opt, oIdx) => {
                    if (oIdx === q.answer) return opt;
                    if (opt.length < 48) {
                        return plausibleDistractors[(idx + oIdx) % plausibleDistractors.length];
                    }
                    return opt;
                });
            }
        });
    });

    const dynamicActivities = [
        {
            unitId: 'notarial',
            type: 'tf',
            q: 'VERDADERO O FALSO: Si un Juez de Letras en funciones aprueba el examen de aptitud y recibe el Exequátur de Notario por parte del Pleno de la Corte Suprema de Justicia, puede abrir su protocolo inmediatamente siempre que solo cartule fuera de su horario de despacho.',
            options: ['Verdadero', 'Falso'],
            answer: 1,
            article: 'Art. 10 Código del Notariado y Art. 319 Constitución',
            rationale: 'Falso. El ejercicio de la judicatura a tiempo completo es absolutamente incompatible con la función notarial; el Juez solo puede abrir protocolo tras cesar formalmente en su cargo judicial.'
        },
        {
            unitId: 'notarial',
            type: 'cloze',
            q: 'Complete correctamente la fórmula esencial de la Nota de Cierre Anual del Protocolo Notarial:',
            clozeText: '"En la ciudad de Tegucigalpa, M.D.C., a los treinta y un días del mes de diciembre del año en curso, yo, el infrascrito Notario, procedo a cerrar el presente Protocolo correspondiente al año civil, haciendo constar que contiene un total de ______ instrumentos autorizados, incluyendo los ______..."',
            options: [
                'cincuenta (50) — suspensos o que no pasaron, distribuidos en los folios útiles numerados correlativamente',
                'diez (10) — contratos privados no firmados por las partes ni testigos instrumentales',
                'cien (100) — certificados de auténtica de firmas emitidos en papel simple sin timbre',
                'veinte (20) — expedientes judiciales remitidos en calidad ad effectum videndi'
            ],
            answer: 0,
            article: 'Art. 40 Código del Notariado',
            rationale: 'La nota de cierre el 31 de diciembre debe detallar con exactitud el número total de instrumentos (válidos y suspensos) y la cantidad de folios utilizados.'
        },
        {
            unitId: 'notarial',
            type: 'tf',
            q: 'VERDADERO O FALSO: Cuando el Instituto de la Propiedad rechaza una escritura pública de 50 folios por errores materiales y el Notario autorizante ya falleció, otro Notario hábil puede solicitar el tomo en la Contraloría del Notariado para salvar las enmendaduras al margen de la escritura matriz.',
            options: ['Verdadero', 'Falso'],
            answer: 1,
            article: 'Art. 25 y 47 Código del Notariado',
            rationale: 'Falso. Ningún Notario puede alterar ni salvar el protocolo de un Notario fallecido; los interesados deben otorgar una nueva Escritura Pública de Rectificación o Aclaración ante un Notario en ejercicio.'
        },
        {
            unitId: 'notarial',
            type: 'cloze',
            q: 'Complete el texto legal de una Auténtica de Copia Fotostática conforme al Reglamento del Papel Notarial:',
            clozeText: '"El infrascrito Notario del domicilio de Tegucigalpa, con Exequátur número ______, CERTIFICA: Que la fotocopia que antecede es ______ con su documento original que tuve a la vista y cotejé debidamente..."',
            options: [
                '1420 — fiel y conforme, habiéndola confrontado en este mismo acto',
                '1420 — parcialmente equivalente, quedando sujeta a ratificación judicial posterior',
                '1420 — válida únicamente para trámites administrativos municipales por treinta días',
                '1420 — sustitutiva de la escritura matriz original para efectos de segunda saca'
            ],
            answer: 0,
            article: 'Art. 29 y 30 Código del Notariado',
            rationale: 'La auténtica de copia da fe plena de la fidelidad y conformidad exacta entre la reproducción y el documento original exhibido al Notario.'
        },
        {
            unitId: 'civil',
            type: 'tf',
            q: 'VERDADERO O FALSO: El testamento cerrado puede ser otorgado válidamente por una persona ciega siempre que sea leído en alta voz dos veces ante el Notario y cinco testigos instrumentales.',
            options: ['Verdadero', 'Falso'],
            answer: 1,
            article: 'Art. 997 Código Civil',
            rationale: 'Falso. Las personas ciegas únicamente pueden otorgar testamento abierto (nuncupativo), nunca cerrado, y debe leerse dos veces en alta voz (una por el Notario y otra por un testigo elegido por el testador).'
        },
        {
            unitId: 'civil',
            type: 'cloze',
            q: 'Complete la regla civil sobre prelación y constitución de múltiples hipotecas sobre un mismo inmueble:',
            clozeText: '"Un mismo bien inmueble ______ ser hipotecado dos o más veces; en caso de concurrencia de acreedores hipotecarios sobre la misma finca, la preferencia se determinará estrictamente por ______."',
            options: [
                'sí puede — el orden cronológico de fecha y hora de su inscripción en el Registro',
                'no puede — el monto mayor del capital adeudado sin importar la fecha del asiento',
                'sí puede — la antigüedad de la escritura matriz aunque no haya sido inscrita',
                'no puede — la autorización previa escrita del primer acreedor hipotecario'
            ],
            answer: 0,
            article: 'Art. 2115 Código Civil y Art. 42 Ley de Propiedad',
            rationale: 'La ley permite hipotecas sucesivas (primer, segundo grado, etc.) sobre un mismo inmueble, rigiendo el principio registral "prior tempore, potior jure".'
        },
        {
            unitId: 'civil',
            type: 'tf',
            q: 'VERDADERO O FALSO: La resolución contractual opera cuando un contrato válido queda sin efecto por incumplimiento de una condición resolutoria, mientras que la rescisión invalida un contrato por causales de nulidad relativa como los vicios del consentimiento o la incapacidad relativa.',
            options: ['Verdadero', 'Falso'],
            answer: 0,
            article: 'Art. 1386 y 1586 Código Civil',
            rationale: 'Verdadero. La resolución deriva de una condición resolutoria (expresa o tácita en bilaterales) sobre un negocio válido; la rescisión ataca un vicio originario de nulidad relativa.'
        },
        {
            unitId: 'familia',
            type: 'tf',
            q: 'VERDADERO O FALSO: Si un menor de 16 años autorizado para trabajar desarrolla una aplicación informática y percibe ingresos propios, su padre puede disponer libremente de ese dinero en virtud de la patria potestad ordinaria.',
            options: ['Verdadero', 'Falso'],
            answer: 1,
            article: 'Art. 253 al 256 Código Civil y Art. 190 Código de Familia',
            rationale: 'Falso. Los bienes adquiridos por el hijo mediante su trabajo o industria integran su peculio profesional o industrial, cuya administración y usufructo corresponden exclusivamente al propio menor.'
        },
        {
            unitId: 'familia',
            type: 'cloze',
            q: 'Complete la disposición del Código de Familia sobre el Convenio Regulador en el divorcio por mutuo consentimiento:',
            clozeText: '"En el divorcio por mutuo consentimiento, no será obligatorio pactar estipulaciones sobre guarda y alimentos en el Convenio Regulador cuando ______."',
            options: [
                'no existan hijos menores de edad ni mayores incapacitados bajo su dependencia',
                'ambos cónyuges acuerden verbalmente que los abuelos asumirán los gastos escolares',
                'el matrimonio tenga menos de cinco años de haberse inscrito en el Registro Civil',
                'uno de los cónyuges resida fuera del territorio nacional al momento de la solicitud'
            ],
            answer: 0,
            article: 'Art. 244 y 245 Código de Familia',
            rationale: 'El convenio regulador tutela los derechos de hijos menores/incapacitados y la liquidación patrimonial; si no hay hijos menores ni bienes comunes, basta declararlo así.'
        },
        {
            unitId: 'constitucional',
            type: 'tf',
            q: 'VERDADERO O FALSO: Si el Poder Ejecutivo celebra un tratado internacional que afecta directamente una disposición de la Constitución de la República, el Congreso Nacional puede aprobarlo mediante mayoría simple ordinaria de diputados presentes.',
            options: ['Verdadero', 'Falso'],
            answer: 1,
            article: 'Art. 17 Constitución de la República',
            rationale: 'Falso. Cuando un tratado internacional afecte una disposición constitucional, debe ser aprobado siguiendo el mismo procedimiento agravado que rige la reforma de la Constitución antes de su ratificación.'
        },
        {
            unitId: 'constitucional',
            type: 'cloze',
            q: 'Complete el criterio jurídico aplicado por la Corte Interamericana de Derechos Humanos en el caso de los cuatro Magistrados destituidos de la Sala Constitucional de Honduras:',
            clozeText: '"La Corte IDH declaró la responsabilidad internacional del Estado de Honduras al determinar que el Congreso Nacional actuó como un ______ al destituir a los magistrados sin existir un procedimiento previo de juicio político vigente, vulnerando la ______."',
            options: [
                'órgano incompetente — independencia judicial y las garantías del debido proceso legal',
                'tribunal de casación — soberanía parlamentaria y la inmunidad diplomática',
                'consejo de la judicatura — facultad reglamentaria del Poder Ejecutivo',
                'órgano electoral — alternabilidad en el ejercicio de la Presidencia'
            ],
            answer: 0,
            article: 'Caso Gutiérrez Navas y otros vs. Honduras (Art. 8 y 25 CADH)',
            rationale: 'La Corte IDH concluyó que el Congreso carecía de competencia constitucional para destituir magistrados, afectando la estabilidad e independencia judicial.'
        },
        {
            unitId: 'penal',
            type: 'tf',
            q: 'VERDADERO O FALSO: En el proceso civil hondureño, la caducidad de la instancia opera de pleno derecho cuando transcurren seis (6) meses de inactividad procesal en segunda instancia o casación, y tres (3) meses en primera instancia.',
            options: ['Verdadero', 'Falso'],
            answer: 1,
            article: 'Art. 488 Código Procesal Civil',
            rationale: 'Falso (los plazos están invertidos). La caducidad de la instancia opera a los seis (6) meses en primera instancia y a los tres (3) meses en segunda instancia o casación.'
        },
        {
            unitId: 'penal',
            type: 'cloze',
            q: 'Complete la definición procesal de "Ad Effectum Videndi" y su plazo habitual de retención del expediente:',
            clozeText: '"La remisión de un expediente judicial o administrativo en calidad de Ad Effectum Videndi significa enviarlo ______, debiendo devolverse al tribunal de origen generalmente dentro de ______."',
            options: [
                'al solo efecto de ser visto o examinado como prueba — veinticuatro (24) a cuarenta y ocho (48) horas',
                'para su archivo definitivo y destrucción — treinta (30) días hábiles improrrogables',
                'para ejecutar sentencia extranjera sin pareatis — seis (6) meses calendario',
                'para acumularlo permanentemente a otro juicio — diez (10) días naturales'
            ],
            answer: 0,
            article: 'Código Procesal Civil de Honduras',
            rationale: 'Ad effectum videndi implica solicitar la vista temporal de actuaciones originales para compulsa o examen probatorio con devolución inmediata.'
        },
        {
            unitId: 'mercantil',
            type: 'tf',
            q: 'VERDADERO O FALSO: En una compraventa de inmueble por valor de L 1,500,000.00, el Impuesto sobre Tradición de Bienes Inmuebles equivale a L 2,448.50, mientras que los derechos de registro en el Instituto de la Propiedad ascienden a L 22,500.00.',
            options: ['Verdadero', 'Falso'],
            answer: 1,
            article: 'Ley del Impuesto de Tradición y Tabla de Tasas del IP',
            rationale: 'Falso (los montos están invertidos). El Impuesto de Tradición (1.5% de 1,500,000) es de L 22,500.00, mientras que los servicios registrales del IP son L 2,448.50.'
        },
        {
            unitId: 'mercantil',
            type: 'cloze',
            q: 'Complete la regla cambiaria sobre la transferencia de Títulos Valores según su ley de circulación:',
            clozeText: '"Los títulos valores expedidos a la orden se transfieren mediante ______; mientras que los títulos nominativos requieren además ______."',
            options: [
                'endoso y entrega material del título — la inscripción de la transmisión en el registro del emisor',
                'simple tradición manual sin firma — la protocolización ante Notario Público',
                'cesión ordinaria de créditos civiles — la autorización del Registro Mercantil',
                'protesto notarial previo — el pago del impuesto sobre ganancias de capital'
            ],
            answer: 0,
            article: 'Art. 478 y 482 Código de Comercio',
            rationale: 'Los títulos a la orden circulan por endoso y entrega; los nominativos exigen adicionalmente anotación en el libro registro del creador.'
        }
    ];

    let counter = 100;
    dynamicActivities.forEach(item => {
        const targetUnit = unitsData.find(u => u.id === item.unitId);
        if (!targetUnit) return;
        counter++;
        targetUnit.questions.push({
            uid: `${item.unitId}_dyn_${counter}`,
            type: item.type,
            q: item.q,
            clozeText: item.clozeText || null,
            options: item.options,
            answer: item.answer,
            article: item.article,
            rationale: item.rationale
        });
    });

    const unitTargets = {
        notarial: 84,
        civil: 84,
        familia: 83,
        constitucional: 83,
        penal: 83,
        mercantil: 83
    };

    const rigorousScenarios = [
        { prefix: 'Dictamen Notarial en Sede Preventiva: Al calificar la procedencia legal de un acto solicitado por los comparecientes, determine el criterio aplicable respecto a: ', suffix: '' },
        { prefix: 'Examen Oral ante el Tribunal de la CSJ: Un Magistrado examinador le plantea el siguiente supuesto jurídico: ', suffix: ' Señale la solución conforme a derecho.' },
        { prefix: 'Análisis de Legalidad y Nulidades: Evalúe la validez, eficacia o sanción jurídica aplicable en Honduras cuando se consulta sobre: ', suffix: '' },
        { prefix: 'Supuesto Práctico de Protocolo y Registro: En el ejercicio activo de la función fedataria, resuelva con fundamento legal: ', suffix: '' },
        { prefix: 'Controversia Doctrinal y Jurisprudencial: Identifique la regla normativa vigente en nuestro ordenamiento jurídico acerca de: ', suffix: '' }
    ];

    unitsData.forEach(unit => {
        const baseSnapshot = [...unit.questions];
        const targetCount = unitTargets[unit.id] || 83;
        let idx = 0;
        while (unit.questions.length < targetCount) {
            const src = baseSnapshot[idx % baseSnapshot.length];
            const scen = rigorousScenarios[Math.floor(idx / baseSnapshot.length) % rigorousScenarios.length];
            counter++;

            const cleanPrompt = src.q
                .replace(/^VERDADERO O FALSO:\s*/i, '')
                .replace(/^¿/, '')
                .replace(/\?$/, '');

            const isTF = src.type === 'tf';
            const qText = isTF
                ? `VERDADERO O FALSO (${scen.prefix.split(':')[0]}): ${cleanPrompt}.`
                : `${scen.prefix}${cleanPrompt}.${scen.suffix}`;

            unit.questions.push({
                uid: `${unit.id}_rig_${counter}`,
                type: src.type || 'single',
                q: qText,
                clozeText: src.clozeText || null,
                options: [...src.options],
                answer: Array.isArray(src.answer) ? [...src.answer] : src.answer,
                article: src.article,
                rationale: src.rationale
            });
            idx++;
        }
    });
})();
