import { html } from 'htm/preact'
import { FunctionComponent } from 'preact'
import { ReactiveForm } from '@nichoth/components/htm/reactive-form'
import { TextInput } from '@nichoth/components/htm/text-input'
// import Debug from '@nichoth/debug'
import { State } from '../state.js'
import '@nichoth/components/text-input.css'
import '@nichoth/components/button.css'

// const debug = Debug()

export const HomeRoute:FunctionComponent<{
    state:Awaited<ReturnType<typeof State>>
}> = function HomeRoute ({ state }) {
    function handleSubmit (ev) {
        ev.preventDefault()

        const els = ev.target.elements
        const text = els['text'].value

        State.AddTodo(state, text)
        // @ts-ignore
        window.target = ev.target.elements['text']

        els['text'].value = ''
    }

    function check (ev) {
        const el = ev.target
        const isComplete = el.checked
        const { id } = el.dataset
        if (isComplete) {
            return State.Complete(state, id)
        }

        // is not complete
        State.Uncomplete(state, id)
    }

    return html`<div class="route home">
        <h2>The list</h2>
        ${Object.keys(state.todos.value).length ?
            html`<ul>
                ${Object.keys(state.todos.value).map(k => {
                    const todo = state.todos.value[k]
                    return html`<li key=${todo.id}>
                        <input checked=${todo.completed}
                            type="checkbox"
                            name="done-status"
                            data-id=${todo.id}
                            onChange=${check}
                        />

                        ${todo.completed ?
                            html`<s>${todo.text}</s>` :
                            html`<span>${todo.text}</span>`
                        }
                    </li>`
                })}
            </ul>` :
            null
        }

        <${ReactiveForm} onSubmit=${handleSubmit}>
            <h2>Create a todo item</h2>
            <${TextInput} name="text" displayName="Something to do"
                required=${true} />
        <//>
    </div>`
}
