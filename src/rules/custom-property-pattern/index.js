import { isRegExp } from "lodash"
import {
  report,
  ruleMessages,
  validateOptions
} from "../../utils"

export const ruleName = "custom-property-pattern"

export const messages = ruleMessages(ruleName, {
  rejected: `Custom property name does not match specified pattern`,
})

export default function (pattern) {
  return (root, result) => {
    validateOptions({ result, ruleName, actual: pattern, possible: isRegExp })

    root.eachDecl(decl => {
      const prop = decl.prop
      if (prop.slice(0, 2) !== "--") { return }

      if (!pattern.test(prop.slice(2))) {
        report({
          message: messages.rejected,
          node: decl,
          result,
          ruleName,
        })
      }
    })
  }
}
