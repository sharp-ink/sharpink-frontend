import * as CustomEditor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/build/ckeditor';

export enum EditorType {
    CHAPTER, SUMMARY
}

export class CkeditorConfigUtil {

    static getCkeditorConfig(editorType: EditorType): any {
        let ckEditorConfig;

        switch (editorType) {
            case EditorType.CHAPTER:
                ckEditorConfig = CustomEditor.defaultConfig;
                ckEditorConfig.placeholder = 'Écrivez ou copiez/collez le contenu de votre chapitre ici...';
                break;
            case EditorType.SUMMARY:
                ckEditorConfig = {
                    placeholder: 'Il était une fois...',
                    language: 'fr',
                    toolbar: [ 'bold', 'italic', 'underline', '|', 'undo', 'redo' ]
                };
                break;
        }

        return ckEditorConfig;
    }

}
