import inquirer from 'inquirer';
import colors from 'colors';



const preguntas = [
    {
      type: 'list',
      name: 'opcion',
      message: '¿Qué desea hacer?',
      choices: [
        {
            value: '1',
            name: `${colors.green('1.')} Crear tarea` 
        },
        {
            value: '2',
            name: `${colors.green('2.')} Listar tareas`
        },
        {
            value: '3',
            name: `${colors.green('3.')} Listar tareas completadas` 
        },
        {
            value: '4',
            name: `${colors.green('4.')} Listar tareas pendientes` 
        },
        {
            value: '5',
            name: `${colors.green('5.')} Completar tarea(s)` 
        },
        {
            value: '6',
            name: `${colors.green('6.')} Eliminar tarea(s)` 
        },
        {
            value: '0',
            name: `${colors.green('0.')} Salir` 
        }
      ],
    },
  ];




const inquirerMenu = async() => {

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción'.white);
    console.log('=========================\n'.green);

    const { opcion } = await inquirer.prompt( preguntas );

    return opcion;
}


const pausa = async() => {

        const inputText = [
            {
                type: 'input',
                name: 'input',
                message: `Presione ${ 'ENTER'.green } para continuar\n`
            }
        ];

        console.log('\n');
        await inquirer.prompt( inputText );      
}


const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt( question );
    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {
    const choices = tareas.map( ( tarea, i ) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas );
    return id;
}

const confirmar = async( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( question );
    return ok;
}


const mostrarListadoCheckList = async( tareas = [] ) => {
    const choices = tareas.map( ( tarea, i ) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( pregunta );
    return ids;
}


export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList };